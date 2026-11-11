const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(initial = {}) {
  const nodes = {}, store = { ...initial };
  const context = {
    document: {
      querySelector(selector) {
        if (/^#word\d+$/.test(selector)) return null;
        return nodes[selector] ||= { innerHTML: '', textContent: '', style: {}, classList: { toggle() {} }, focus() {}, scrollIntoView() {} };
      },
      querySelectorAll: () => []
    },
    localStorage: { getItem: key => store[key] ?? null, setItem: (key, value) => { store[key] = String(value); } },
    fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) })
  };
  context.window = context;
  vm.createContext(context);
  const html = fs.readFileSync('src/index.html', 'utf8');
  for (const match of html.matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync('src/' + match[1], 'utf8'), context);
  context.testWords = JSON.parse(fs.readFileSync('src/words.json'));
  vm.runInContext('words=testWords', context);
  return { nodes, store, run: code => vm.runInContext(code, context) };
}

test('home provides study and review actions; meaningful progress counts only available words', () => {
  const { run, nodes } = setup({ learned: '[1,2,999]' });
  run("setPage('home')");
  assert.ok(nodes['#content'].innerHTML.includes('Estudar o alfabeto'));
  assert.ok(nodes['#content'].innerHTML.includes('Ver minha revisão'));
  assert.equal(nodes['#progressPct'].textContent, '2 de 30');
  run("setPage('vocab');setPage('home')");
  assert.ok(nodes['#content'].innerHTML.includes('Continuar de onde parei'));
});

test('vocabulary groups cover the whole library; filters and bounds remain consistent', () => {
  const { run, nodes } = setup();
  run("setPage('vocab')");
  const seen = new Set();
  for (let batch = 0; batch < 5; batch++) {
    const ids = [...nodes['#content'].innerHTML.matchAll(/id="word(\d+)"/g)].map(m => Number(m[1]));
    assert.equal(ids.length, 6);
    ids.forEach(id => seen.add(id));
    run('moveVocabulary(1)');
  }
  assert.equal(seen.size, 30);
  assert.equal(run('vocabOffset'), 24);
  run("setVocabularyCategory('Animais')");
  assert.equal(run('vocabOffset'), 0);
  assert.equal((nodes['#content'].innerHTML.match(/class="wordcard/g) || []).length, 6);
  run("setVocabularyCategory('all');setVocabularyView('library')");
  assert.equal((nodes['#content'].innerHTML.match(/class="wordcard/g) || []).length, 12);
  run("setVocabularyCategory('unknown');setVocabularyView('unknown');moveVocabulary(99)");
  assert.equal(run('vocabView'), 'library');
  assert.equal(run('vocabCategory'), 'all');
});

test('bookmarks restore alphabet, signs and vocabulary after a simulated restart', () => {
  for (const [actions, check] of [
    ["setPage('alphabet');setAlphabetSection('letters');showLetter(12)", "page==='alphabet'&&alphabetSection==='letters'&&selectedLetter===12"],
    ["setPage('niqqud');setSignsStage('niqqud',1);selectSign('niqqud',7)", "page==='niqqud'&&signsState.niqqud.stage===1&&signsState.niqqud.item===7"],
    ["setPage('vocab');moveVocabulary(1)", "page==='vocab'&&vocabOffset===6"],
    ["setPage('practice');quizIndex=8;rememberStudy()", "page==='practice'&&quizIndex===8"]
  ]) {
    const first = setup();
    first.run(actions);
    first.run("setPage('home')");
    const second = setup(first.store);
    second.run('resumeStudy()');
    assert.equal(second.run(check), true);
    assert.equal(second.store.learned, undefined);
    assert.equal(second.store['hi.srs.v1'], undefined);
  }
});

test('invalid bookmark safely falls back to alphabet and meaning stays hidden', () => {
  const { run, nodes } = setup({ 'hi.study.v1': '{broken' });
  run('resumeStudy()');
  assert.equal(run('page'), 'alphabet');
  run("setPage('vocab')");
  assert.ok(!nodes['#content'].innerHTML.includes('Cavalo'));
  run('reveal(1)');
  assert.equal(nodes['#meaning1'].textContent, 'Cavalo');
  run('mark(1)');
  assert.ok(run('card(words[0])').includes('Conhecida ✓'));
});

test('reading translation stays in the requested disclosure and word order is RTL', () => {
  const { run, nodes } = setup();
  run("setPage('reading')");
  assert.ok(nodes['#content'].innerHTML.includes('class="versewords" lang="he" dir="rtl"'));
  run('verseInfo(0)');
  assert.ok(!nodes['#verseInfo'].innerHTML.split('<p hidden>')[0].toLowerCase().includes('no princípio'));
  assert.ok(nodes['#verseInfo'].innerHTML.includes('<p hidden>No princípio</p>'));
});

test('review session hides the overview and the full queue', () => {
  const { run, nodes } = setup();
  run("setPage('review');addReviewWords();reviewPage();startReview(dueWords())");
  assert.equal(nodes['#reviewOverview'].hidden, true);
  assert.equal(nodes['.review-queue'].hidden, true);
  assert.ok(nodes['#reviewSession'].innerHTML.includes('Voltar à fila'));
});
