const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(initial = {}) {
  const store = { ...initial }, nodes = {};
  let now = 1800000000000;
  const blocked = new Set();
  const context = {
    Date: class extends Date { static now() { return now; } },
    document: {
      querySelector(selector) {
        if (/^#word\d+$/.test(selector)) return null;
        return nodes[selector] ||= { innerHTML: '', textContent: '', style: {}, focus() {}, scrollIntoView() {} };
      },
      querySelectorAll: () => []
    },
    localStorage: {
      getItem: key => store[key] ?? null,
      setItem(key, value) {
        if (blocked.has(key)) throw Error('QuotaExceededError');
        store[key] = String(value);
      }
    },
    fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) })
  };
  context.window = context;
  vm.createContext(context);
  for (const match of fs.readFileSync('src/index.html', 'utf8').matchAll(/<script src="([^"]+)"/g)) {
    vm.runInContext(fs.readFileSync('src/' + match[1], 'utf8'), context);
  }
  context.testWords = JSON.parse(fs.readFileSync('src/words.json'));
  vm.runInContext('words=testWords', context);
  return { store, nodes, blocked, advance: ms => { now += ms; }, run: code => vm.runInContext(code, context) };
}

test('audit: failed reading storage does not claim that a changed selection was saved', () => {
  const { nodes, blocked, run } = setup();
  run("setPage('reading');chooseReading('Gen.1.1')");
  blocked.add('hi.reading.v1');
  run("chooseReading('Ps.119.105');verseInfo(2)");
  assert.ok(nodes['#persistenceNotice'].textContent.includes('Não foi possível salvar'));
  assert.ok(!nodes['.reading-position'].textContent.includes('Sua posição é salva neste dispositivo.'),
    'a posição selecionada não foi salva e não deve ser apresentada como salva');
});

test('audit: review failure becomes due exactly after ten minutes, including after restart', () => {
  const first = setup();
  first.run('nextReview(1,1)');
  assert.equal(first.run('dueWords().length'), 0);
  first.advance(599999);
  assert.equal(first.run('dueWords().length'), 0);
  first.advance(1);
  assert.equal(first.run('dueWords().length'), 1);
  const restarted = setup(first.store);
  restarted.advance(600000);
  assert.equal(restarted.run('dueWords().length'), 1);
});

test('audit: malformed reading indices recover and preserve the original on the first save', () => {
  for (const word of [-2, 7, '0', null]) {
    const raw = JSON.stringify({ passage: 'Gen.1.1', word, clean: false });
    const { store, run } = setup({ 'hi.reading.v1': raw });
    assert.equal(run('readingState.word'), -1);
    run("setPage('reading');chooseReading('Gen.1.3')");
    const key = Object.keys(store).find(key => key.startsWith('hi.reading.v1.recovery.'));
    assert.equal(store[key], raw);
  }
});

test('audit: known-word familiarity survives an SRS save failure with an explicit partial-success notice', () => {
  const {run,blocked,store,nodes}=setup();
  blocked.add('hi.srs.v1');
  assert.equal(run('mark(1)'),false);
  assert.deepEqual(JSON.parse(store.learned),[1]);
  assert.ok(nodes['#persistenceNotice'].textContent.includes('A familiaridade foi salva'));
  assert.equal(store['hi.srs.v1'],undefined);
  blocked.clear();
  assert.equal(run('mark(1)'),true);
  assert.ok(JSON.parse(store['hi.srs.v1'])['1']);
});

test('audit: reading distinguishes its saved position from an unsaved global bookmark', () => {
  const {run,blocked,nodes}=setup();
  run("setPage('reading')");
  blocked.add('hi.study.v1');
  run("chooseReading('Gen.1.3');verseInfo(0)");
  assert.ok(nodes['.reading-position'].textContent.includes('foi salva, mas o atalho Continuar'));
});

test('audit: resuming reading prefers its newer own position over a stale global bookmark', () => {
  const first=setup();
  first.run("setPage('reading');chooseReading('Gen.1.1')");
  first.blocked.add('hi.study.v1');
  first.run("chooseReading('Gen.1.3');verseInfo(4)");
  const second=setup(first.store);
  second.run('resumeStudy()');
  assert.equal(second.run('readingState.passage'),'Gen.1.3');
  assert.equal(second.run('readingState.word'),4);
});
