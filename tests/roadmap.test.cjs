const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(initial = {}) {
  const nodes = {}, store = { ...initial };
  let failWrites = false;
  const context = {
    document: {
      querySelector: key => nodes[key] ||= { innerHTML:'', textContent:'', style:{}, classList:{toggle(){}}, focus(){} },
      querySelectorAll: () => []
    },
    localStorage: {
      getItem: key => store[key] ?? null,
      setItem(key,value) { if(failWrites)throw Error('QuotaExceededError');store[key]=String(value); }
    },
    fetch: () => ({ then: () => ({ then: () => ({ catch() {} }) }) })
  };
  context.window = context;
  vm.createContext(context);
  for (const [,file] of fs.readFileSync('src/index.html','utf8').matchAll(/<script src="([^"]+)"/g)) vm.runInContext(fs.readFileSync('src/'+file,'utf8'),context);
  context.testWords=JSON.parse(fs.readFileSync('src/words.json'));
  vm.runInContext('words=testWords',context);
  return {nodes,store,fail:()=>{failWrites=true;},run:code=>vm.runInContext(code,context)};
}

test('every monthly block has four weeks, valid daily durations and rest days', () => {
  const {run}=setup();
  assert.equal(run('roadmapMonths.length'),24);
  assert.equal(run('roadmapMonths.reduce((n,m)=>n+m.weeks.length,0)'),96);
  assert.equal(run(`roadmapMonths.every((month,m)=>month.weeks.length===4&&month.weeks.every((topic,w)=>
    [3,5,6].every(days=>[20,30,45,60].every(minutes=>Array.from({length:7},(_,day)=>day).every(day=>{
      const tasks=roadmapDayTasks({...roadmapDefaults(),month:m,week:w,day,days,minutes});
      return day>=days?tasks.length===0:tasks.length===3&&tasks.every(t=>t.description.length>0&&t.minutes>0)&&tasks.reduce((sum,t)=>sum+t.minutes,0)===minutes;
    })))))`),true);
});

test('the first two weeks cover all 22 letters without skipping any at any pace', () => {
  const {run}=setup();
  for(const days of [3,5,6]) {
    const covered=[];
    for(let week=0;week<2;week++)for(let day=0;day<days-1;day++) {
      const range=JSON.parse(run(`JSON.stringify(roadmapLetterRange({days:${days},day:${day}},roadmapIntroWeeks[0][${week}]))`));
      for(let index=range[0];index<=range[1];index++)covered.push(index);
    }
    assert.deepEqual(covered,Array.from({length:22},(_,i)=>i));
  }
});

test('navigation opens real introductory modules and marks future lessons honestly', () => {
  const {run,nodes}=setup();
  run("setPage('roadmap')");
  assert.ok(nodes['#content'].innerHTML.includes('Minha semana'));
  assert.ok(nodes['#roadmapPanel'].innerHTML.includes('Mês 1'));
  run("changeRoadmap('day',1);openRoadmapActivity('focus')");
  assert.equal(run('page'), 'alphabet');
  assert.equal(run('selectedLetter'),2);
  run("setPage('roadmap');changeRoadmap('week',3);openRoadmapActivity('focus')");
  assert.equal(run('page'), 'niqqud');
  assert.equal(run('signsState.niqqud.stage'),1);
  run("setPage('roadmap');selectRoadmapMonth(1);changeRoadmap('week',2);openRoadmapActivity('practice')");
  assert.equal(run('page'), 'dagesh');
  run("setPage('roadmap');selectRoadmapMonth(2)");
  assert.ok(nodes['#roadmapPanel'].innerHTML.includes('Aula ainda não implementada'));
  assert.ok(nodes['#roadmapPanel'].innerHTML.includes('Ver roteiro da gramática'));
  run("openRoadmapActivity('focus')");
  assert.equal(run('page'),'grammar');
  run("setPage('roadmap');changeRoadmap('view','overview')");
  assert.ok(nodes['#roadmapPanel'].innerHTML.includes('Meses 19–24 e além'));
});

test('settings and daily completion survive reload; rest days cannot be marked', () => {
  const first=setup();
  first.run("setPage('roadmap');changeRoadmap('minutes',45);changeRoadmap('days',6);changeRoadmap('day',5)");
  assert.equal(first.run("toggleRoadmapTask('m1-w1-d6-focus',true)"),true);
  assert.equal(first.run("toggleRoadmapTask('m1-w1-d6-focus',true)"),true);
  assert.equal(first.run('roadmapWeekProgress(getRoadmap()).count'),1);
  const second=setup(first.store);
  assert.equal(second.run('getRoadmap().minutes'),45);
  assert.equal(second.run('getRoadmap().day'),5);
  assert.equal(second.run('getRoadmap().done.length'),1);
  second.run("changeRoadmap('days',3)");
  assert.equal(second.run('roadmapWeekProgress(getRoadmap()).count'),0);
  assert.equal(second.run("toggleRoadmapTask('m1-w1-d6-focus',false)"),false);
  second.run("changeRoadmap('days',6)");
  assert.equal(second.run('roadmapWeekProgress(getRoadmap()).count'),1);
  assert.equal(second.run("toggleRoadmapTask('m1-w1-d6-focus',false)"),true);
  assert.equal(second.run('getRoadmap().done.length'),0);
  assert.equal(second.store.learned,undefined);
  assert.equal(second.store['hi.srs.v1'],undefined);
});

test('all 39 book entries can be marked and restored independently', () => {
  const {run,store,nodes}=setup();
  assert.equal(run('new Set(roadmapBooks).size'),39);
  run("setPage('roadmap');changeRoadmap('view','books')");
  for(let i=0;i<39;i++)assert.equal(run(`toggleRoadmapBook(${i},true)`),true);
  assert.ok(nodes['#roadmapBookCount'].textContent.includes('39 de 39'));
  assert.equal(run('toggleRoadmapBook(39,true)'),false);
  const reopened=setup(store);
  reopened.run("setPage('roadmap')");
  assert.ok(reopened.nodes['#roadmapPanel'].innerHTML.includes('39 de 39'));
  assert.equal(reopened.run('getRoadmap().done.length'),0);
});

test('corruption is preserved and failed saves do not leave a false checkmark', () => {
  const {run,store,nodes,fail}=setup({'hi.roadmap.v1':'{invalid'});
  run("setPage('roadmap')");
  assert.equal(run('getRoadmap().days'),5);
  assert.equal(run("changeRoadmap('minutes',20)"),true);
  assert.equal(store[Object.keys(store).find(k=>k.startsWith('hi.roadmap.v1.recovery.'))],'{invalid');
  assert.equal(run("changeRoadmap('__proto__',0)"),false);
  assert.equal(run("changeRoadmap('month',24)"),false);
  fail();
  assert.equal(run("const control={checked:true};toggleRoadmapTask('m1-w1-d1-focus',true,control);control.checked"),false);
  assert.equal(run('getRoadmap().done.length'),0);
  assert.ok(nodes['#persistenceNotice'].textContent.includes('Não foi possível salvar'));
});
