const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const nodes = {};
  const document = {
    querySelector: selector => nodes[selector] ||= { innerHTML: '', textContent: '', style: {}, focus() {} },
    querySelectorAll: () => []
  };
  const context = { document, localStorage: { getItem: () => null }, fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) }) };
  context.window = context;
  vm.createContext(context);
  for (const file of ['src/progress.js', 'src/app.js', 'src/alphabet.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  return { nodes, run: code => vm.runInContext(code, context) };
}

test('all four stages render and every letter has a usable detail', () => {
  const { nodes, run } = setup();
  for (const section of ['start', 'letters', 'finals', 'practice']) {
    run(`setAlphabetSection('${section}')`);
    assert.ok(nodes['#alphabetPanel'].innerHTML.length > 100);
  }
  run("setAlphabetSection('letters')");
  for (let i = 0; i < 22; i++) {
    run(`showLetter(${i})`);
    assert.ok(nodes['#letterDetail'].innerHTML.includes(`LETRA ${i + 1} DE 22`));
    assert.ok(!nodes['#letterDetail'].innerHTML.includes('undefined'));
  }
});

test('practice starts with selected letter and always provides four unique choices', () => {
  const { run } = setup();
  run("setAlphabetSection('letters'); showLetter(12); setAlphabetSection('practice')");
  assert.equal(run('alphabetQuestion.selected'), 12);
  for (let i = 0; i < 22; i++) {
    run(`newLetterQuiz(${i})`);
    assert.equal(run('new Set(alphabetQuestion.options).size'), 4);
    assert.equal(run('alphabetQuestion.options[alphabetQuestion.correct]'), run(`alphabet[${i}][2].split(';')[0]`));
  }
});

test('answer feedback is guarded and next question resets the state', () => {
  const { nodes, run } = setup();
  run("setAlphabetSection('practice'); checkLetter(-1)");
  assert.equal(run('alphabetQuestion.answered'), false);
  run('checkLetter(alphabetQuestion.correct)');
  assert.ok(nodes['#letterFeedback'].textContent.startsWith('Correto!'));
  const feedback = nodes['#letterFeedback'].textContent;
  run('checkLetter((alphabetQuestion.correct + 1) % 4)');
  assert.equal(nodes['#letterFeedback'].textContent, feedback);
  run('newLetterQuiz()');
  assert.equal(run('alphabetQuestion.answered'), false);
  assert.equal(nodes['#nextLetterQuestion'].disabled, true);
});
