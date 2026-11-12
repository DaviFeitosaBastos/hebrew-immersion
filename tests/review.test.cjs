const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(initial = {}) {
  const store = { ...initial }, nodes = {};
  let failWrites = false;
  const now = 1800000000000;
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
      setItem(key, value) { if (failWrites) throw Error('QuotaExceededError'); store[key] = String(value); }
    },
    fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) })
  };
  context.window = context;
  vm.createContext(context);
  for (const file of ['src/progress.js', 'src/app.js', 'src/hybrid.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  context.testWords = JSON.parse(fs.readFileSync('src/words.json'));
  vm.runInContext("words=testWords;page='review'", context);
  return { store, nodes, now, fail: () => { failWrites = true; }, run: code => vm.runInContext(code, context) };
}

test('successive batches include every word exactly once and survive reload', () => {
  const { run, store } = setup();
  assert.equal(run('addReviewWords()'), 10);
  assert.equal(run('addReviewWords()'), 10);
  assert.equal(run('addReviewWords()'), 10);
  assert.equal(run('addReviewWords()'), 0);
  assert.equal(Object.keys(JSON.parse(store['hi.srs.v1'])).length, 30);
  assert.equal(setup(store).run('dueWords().length'), 30);
});

test('corrupt progress recovers without silently overwriting the original', () => {
  const { run, store } = setup({ learned: '{broken', 'hi.srs.v1': '[]' });
  assert.equal(run('getLearned().length'), 0);
  assert.equal(run('trackedWords().length'), 0);
  assert.equal(run('mark(1)'), true);
  assert.equal(store[Object.keys(store).find(k => k.startsWith('learned.recovery.'))], '{broken');
  assert.equal(store[Object.keys(store).find(k => k.startsWith('hi.srs.v1.recovery.'))], '[]');
  assert.equal(run('getLearned()[0]'), 1);
  assert.equal(run('dueWords()[0].id'), 1);
});

test('damaged SRS rows retain valid records and requeue damaged ones', () => {
  const good = { repetitions: 1, interval: 1, ease: 2.5, due: 1900000000000, attempts: 1, correct: 1 };
  const original = JSON.stringify({ 1: good, 2: null, 3: { ...good, due: 'tomorrow' } });
  const { run, store } = setup({ 'hi.srs.v1': original });
  assert.equal(run('trackedWords().length'), 3);
  assert.equal(run('dueWords().length'), 2);
  assert.equal(run('getSrs()[1].due'), good.due);
  run('nextReview(2,4)');
  assert.equal(store[Object.keys(store).find(k => k.startsWith('hi.srs.v1.recovery.'))], original);
});

test('failure returns in ten minutes, success grows intervals and invalid grades are ignored', () => {
  const { run, now, store } = setup();
  run('addReviewWords()');
  assert.equal(run('nextReview(1,1).due'), now + 600000);
  assert.equal(run('nextReview(1,4).interval'), 1);
  assert.equal(run('nextReview(1,4).interval'), 3);
  assert.ok(run('nextReview(1,4).interval') > 3);
  const snapshot = store['hi.srs.v1'];
  for (const grade of ['NaN', 'Infinity', '-1', '2', 'null', '"4"']) assert.equal(run(`nextReview(1,${grade})`), false);
  assert.equal(run('nextReview(999,4)'), false);
  assert.equal(store['hi.srs.v1'], snapshot);
});

test('session keeps Portuguese hidden, accepts recognition without translation and blocks stale clicks', () => {
  const { run, nodes } = setup();
  run('addReviewWords();reviewPage();startReview(dueWords())');
  assert.ok(!nodes['#reviewSession'].innerHTML.includes('Cavalo'));
  const token = run('reviewToken');
  run(`gradeReview(4,${token})`);
  assert.equal(run('reviewCursor'), 0);
  assert.ok(nodes['#reviewGradeFeedback'].textContent.includes('Avaliação salva'));
  run(`advanceReview(${token})`);
  assert.equal(run('reviewCursor'), 1);
  run(`gradeReview(4,${token})`);
  assert.equal(run('reviewCursor'), 1);
  run('revealReview(reviewToken)');
  assert.equal(nodes['#reviewReveal'].textContent, run('reviewItems[reviewCursor].pt'));
  run("page='vocab';gradeReview(4,reviewToken)");
  assert.equal(run('reviewCursor'), 1);
});

test('completion refreshes counters and no pending review can start again', () => {
  const { run, nodes } = setup();
  run('mark(1);reviewPage();startReview(dueWords());gradeReview(4,reviewToken);advanceReview(reviewToken)');
  assert.equal(run('dueWords().length'), 0);
  assert.equal(run('reviewItems.length'), 0);
  assert.ok(nodes['#reviewMessage'].textContent.includes('concluída'));
  run('startReview([])');
  assert.equal(run('reviewItems.length'), 0);
});

test('failed persistence does not advance the session or claim a successful save', () => {
  const { run, fail, store, nodes } = setup();
  run('addReviewWords();reviewPage();startReview(dueWords())');
  const snapshot = store['hi.srs.v1'];
  fail();
  run('gradeReview(4,reviewToken)');
  assert.equal(run('reviewCursor'), 0);
  assert.equal(store['hi.srs.v1'], snapshot);
  assert.ok(nodes['#persistenceNotice'].textContent.includes('Não foi possível salvar'));
  assert.equal(run('mark(2)'), false);
  assert.equal(store.learned, undefined);
});

test('vocabulary reveal contains only Portuguese and marking preserves a revealed meaning', () => {
  const { run, nodes } = setup();
  run('reveal(1)');
  assert.equal(nodes['#meaning1'].textContent, 'Cavalo');
  run('mark(1)');
  assert.equal(nodes['#meaning1'].textContent, 'Cavalo');
  assert.ok(!run('card(words[0])').includes('Cavalo'));
});

test('a grade waits for explicit advance, shows the schedule and cannot be saved twice', () => {
  const {run,nodes,store}=setup();
  run('mark(1);reviewPage();startReview(dueWords())');
  const token=run('reviewToken');
  run(`advanceReview(${token})`);
  assert.equal(run('reviewCursor'),0);
  run(`gradeReview(1,${token})`);
  assert.equal(run('reviewCursor'),0);
  assert.equal(nodes['#reviewProgress'].value,1);
  assert.ok(nodes['#reviewGradeFeedback'].textContent.includes('10 minutos'));
  assert.equal(nodes['#nextReviewWord'].hidden,false);
  const saved=store['hi.srs.v1'];
  run(`gradeReview(5,${token})`);
  assert.equal(store['hi.srs.v1'],saved);
  run(`advanceReview(${token})`);
  assert.ok(nodes['#reviewMessage'].textContent.includes('concluída'));
});
