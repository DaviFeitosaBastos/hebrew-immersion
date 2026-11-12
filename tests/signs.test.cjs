const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const nodes = {};
  const context = { $: selector => nodes[selector] ||= { innerHTML: '', textContent: '', focus() {} }, document: { querySelectorAll: () => [] } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('src/signs.js', 'utf8'), context);
  return { nodes, run: code => vm.runInContext(code, context) };
}

for (const course of ['niqqud', 'dagesh']) {
  test(`${course}: all stages and details render, invalid navigation is ignored`, () => {
    const { nodes, run } = setup();
    for (let stage = 0; stage < 4; stage++) {
      run(`setSignsStage('${course}',${stage})`);
      assert.ok(nodes['#content'].innerHTML.includes('<h3>'));
    }
    run(`setSignsStage('${course}',1)`);
    const count = run(`signsCourses.${course}.items.length`);
    for (let index = 0; index < count; index++) {
      run(`selectSign('${course}',${index})`);
      assert.ok(!nodes['#signDetail'].innerHTML.includes('undefined'));
    }
    run(`setSignsStage('${course}',-1); setSignsStage('${course}',5)`);
    assert.equal(run(`signsState.${course}.stage`), 1);
  });

  test(`${course}: selected item, unique choices and guarded answers`, () => {
    const { nodes, run } = setup();
    run(`setSignsStage('${course}',1); selectSign('${course}',1); setSignsStage('${course}',3)`);
    assert.equal(run('signsQuestion.selected'), 1);
    const count = run(`signsCourses.${course}.items.length`);
    for (let index = 0; index < count; index++) {
      run(`newSignQuestion('${course}',${index})`);
      assert.equal(run('new Set(signsQuestion.options.map(o => o.label)).size'), run(`Math.min(signGroup('${course}',${index})?.items.length ?? signsCourses.${course}.items.length,4)`));
      assert.equal(run('signsQuestion.options.filter(o => o.index === signsQuestion.selected).length'), 1);
      run('answerSign(-1)');
      assert.equal(run('signsQuestion.answered'), false);
      run('answerSign(signsQuestion.options.findIndex(o => o.index === signsQuestion.selected))');
      assert.ok(nodes['#signFeedback'].textContent.startsWith('Correto!'));
      const feedback = nodes['#signFeedback'].textContent;
      run('answerSign(0)');
      assert.equal(nodes['#signFeedback'].textContent, feedback);
      assert.equal(nodes['#nextSignQuestion'].disabled, false);
    }
  });
}

test('Shuruq is represented by vav itself and courses preserve separate state', () => {
  const { nodes, run } = setup();
  assert.equal(run('signsCourses.niqqud.items[7][0]'), 'וּ');
  run("setSignsStage('niqqud',1); selectSign('niqqud',7); setSignsStage('dagesh',2); renderSignsCourse('niqqud')");
  assert.ok(nodes['#signDetail'].innerHTML.includes('Shuruq'));
  assert.equal(run('signsState.dagesh.stage'), 2);
});

test('expanded Niqqud groups cover each topic once and preserve existing bookmark indices', () => {
  const { run } = setup();
  assert.equal(run('signsCourses.niqqud.items.length'), 18);
  assert.equal(run('niqqudGroups.flatMap(g=>g.items).length'), 18);
  assert.equal(run('new Set(niqqudGroups.flatMap(g=>g.items)).size'), 18);
  assert.equal(run('niqqudGroups.flatMap(g=>g.items).every(i=>Boolean(signsCourses.niqqud.items[i]))'), true);
  assert.equal(run('signsCourses.niqqud.items[7][1]'), 'Shuruq');
  assert.equal(run('signsCourses.niqqud.items[8][1]'), 'Sheva');
  for (const [index, sample] of [[9,'אֲ'],[10,'אֱ'],[11,'אֳ'],[13,'וֹ'],[14,'בִי'],[15,'בֵי'],[16,'בֶי'],[17,'וֺ']]) {
    assert.equal(run(`signsCourses.niqqud.items[${index}][0]`), sample);
  }
});

test('contextual readings never require classifying the isolated ambiguous glyph', () => {
  const { run, nodes } = setup();
  for (const index of [12,17]) {
    run(`setSignsStage('niqqud',3);newSignQuestion('niqqud',${index})`);
    assert.equal(run('signsQuestion.kind'), 'concept');
    assert.ok(nodes['#signQuestion'].innerHTML.includes('signs-prompt'));
    assert.ok(!nodes['#signQuestion'].innerHTML.includes('alphabet-symbol'));
  }
  run("newSignQuestion('niqqud',1)");
  assert.equal(run('signsQuestion.kind'), 'visual');
  assert.equal(run('signsQuestion.options.some(option=>option.index===12)'), false);
});

test('subsequent questions stay in the selected group', () => {
  const { run } = setup();
  for (const index of [0,8,7,12]) {
    run(`newSignQuestion('niqqud',${index})`);
    for (let attempt = 0; attempt < 30; attempt++) {
      run("newSignQuestion('niqqud')");
      assert.equal(run(`signGroup('niqqud',${index}).items.includes(signsQuestion.selected)`), true);
      assert.equal(run(`signsQuestion.options.every(o=>signGroup('niqqud',${index}).items.includes(o.index))`), true);
    }
  }
});

test('Niqqud catalog exposes all categories and shows safe alphabet demonstrations', () => {
  const { nodes, run } = setup();
  run("renderSignsCourse('niqqud')");
  assert.equal((nodes['#content'].innerHTML.match(/class="niqqud-tile"/g)||[]).length,18);
  assert.equal((nodes['#content'].innerHTML.match(/class="niqqud-sign-diagram"/g)||[]).length,12);
  assert.ok(nodes['#content'].innerHTML.includes('stroke-dasharray'));
  assert.equal(run('niqqudLengths[0]'),'Breve');
  assert.equal(run('niqqudLengths[1]'),'Longa');
  assert.equal(run('niqqudLengths[9]'),'Reduzida');
  assert.equal(run('niqqudLengths[12]'),'Breve');
  for (let i=0;i<18;i++) {
    run(`selectSign('niqqud',${i})`);
    assert.ok(!nodes['#signDetail'].innerHTML.includes('undefined'));
    assert.equal((nodes['#signDetail'].innerHTML.match(/<small>/g)||[]).length,i===17?1:22);
  }
  assert.equal(run("niqqudSample(7,'ב')"),'בוּ');
  assert.equal(run("niqqudSample(13,'ב')"),'בוֹ');
  assert.equal(run("niqqudSample(14,'ב')"),'בִי');
  assert.equal(run("niqqudSample(17,'ב')"),'וֺ');
});

test('Dagesh catalog exposes existing marks directly without step navigation', () => {
  const { nodes, run } = setup();
  run("renderSignsCourse('dagesh')");
  assert.equal((nodes['#content'].innerHTML.match(/class="niqqud-tile"/g)||[]).length,7);
  assert.ok(!nodes['#content'].innerHTML.includes('alphabet-steps'));
  for (let index=0;index<7;index++) {
    run(`selectSign('dagesh',${index},true)`);
    assert.ok(!nodes['#signDetail'].innerHTML.includes('undefined'));
    assert.ok(!nodes['#signDetail'].innerHTML.includes('Seguinte'));
    run(`newSignQuestion('dagesh',${index})`);
    assert.equal(run('signsQuestion.kind'),'concept');
  }
  run("selectSign('dagesh',2)");
  assert.ok(nodes['#signDetail'].innerHTML.includes('שׁ'));
  assert.ok(nodes['#signDetail'].innerHTML.includes('שׂ'));
});

test('Dagesh examples respect letter restrictions and separate Qal from gemination', () => {
  const { nodes, run } = setup();
  for (const [index,count] of [[0,6],[1,17]]) {
    run(`selectSign('dagesh',${index})`);
    const html=nodes['#signDetail'].innerHTML;
    assert.equal((html.match(/class="dagesh-applicable"/g)||[]).length,count);
    assert.ok(html.includes('dagesh-table'));
    for (const invalid of ['אּ','הּ','חּ','עּ','רּ']) assert.ok(!run(`dageshAlphabet(${index})`).includes(invalid));
  }
  assert.ok(run('dageshAlphabet(1)').includes('Shuruq'));
});
