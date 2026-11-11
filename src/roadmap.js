const ROADMAP_KEY = 'hi.roadmap.v1';
const roadmapDefaults = () => ({ version:1, month:0, week:0, day:0, minutes:30, days:5, view:'week', done:[], books:[] });
function validRoadmapTask(id) {
  return typeof id === 'string' && /^m(?:[1-9]|1[0-9]|2[0-4])-w[1-4]-d[1-6]-(review|focus|practice)$/.test(id);
}
function getRoadmap() {
  return readProgress(ROADMAP_KEY,roadmapDefaults(),value=>value&&value.version===1&&
    Number.isInteger(value.month)&&value.month>=0&&value.month<roadmapMonths.length&&
    Number.isInteger(value.week)&&value.week>=0&&value.week<4&&Number.isInteger(value.day)&&value.day>=0&&value.day<7&&
    [20,30,45,60].includes(value.minutes)&&[3,5,6].includes(value.days)&&['week','overview','books'].includes(value.view)&&
    Array.isArray(value.done)&&value.done.length<=1728&&value.done.every(validRoadmapTask)&&new Set(value.done).size===value.done.length&&
    Array.isArray(value.books)&&value.books.length<=roadmapBooks.length&&value.books.every(book=>roadmapBooks.includes(book))&&new Set(value.books).size===value.books.length);
}
function saveRoadmap(state) { return writeProgress(ROADMAP_KEY,state); }
function changeRoadmap(field,value,control) {
  const state=getRoadmap();
  const allowed={ month:roadmapMonths.map((_,i)=>i), week:[0,1,2,3], day:[0,1,2,3,4,5,6], minutes:[20,30,45,60], days:[3,5,6], view:['week','overview','books'] };
  if(!Array.isArray(allowed[field])||!allowed[field].includes(value))return false;
  const previous=state[field];state[field]=value;
  if(field==='month'){state.week=0;state.day=0;}
  if(field==='week')state.day=0;
  if(!saveRoadmap(state)){if(control)control.value=String(previous);return false;}
  renderRoadmap();
  const focus={month:'#roadmapMonth',week:`#roadmapWeek${value}`,day:`#roadmapDay${value}`,minutes:'#roadmapMinutes',days:'#roadmapDays',view:`#roadmapView${value}`}[field];
  const nextControl=$(focus);if(nextControl)nextControl.focus();
  return true;
}
function roadmapTaskId(state,type) { return `m${state.month+1}-w${state.week+1}-d${state.day+1}-${type}`; }
function roadmapTime(minutes) {
  const review=Math.round(minutes*.2), focus=Math.round(minutes*.6);
  return {review,focus,practice:minutes-review-focus};
}
function roadmapLetterRange(state,intro) {
  if(!intro?.letters)return null;
  const [first,last]=intro.letters;
  if(state.day>=state.days-1)return [first,last];
  const count=last-first+1, sessions=state.days-1;
  return [first+Math.floor(state.day*count/sessions),first+Math.floor((state.day+1)*count/sessions)-1];
}
function roadmapFocusInstruction(state,month,intro,action) {
  const range=roadmapLetterRange(state,intro);
  if(range){
    const [first,last]=range.map(index=>alphabet[index][1].split(' / ')[0]);
    return state.day===state.days-1?`Retome ${first} a ${last} em ordem misturada. Observe quais formas ainda se confundem.`:`Estude ${first} a ${last}. Em cada letra, observe a forma, confira o nome e tente reconhecê-la sem olhar a legenda.`;
  }
  const approach={
    Conhecer:'Leia a explicação inicial e escolha dois exemplos para observar.',
    Observar:'Compare dois exemplos e diga o que muda entre eles.',
    Praticar:'Tente reconhecer os exemplos sem a resposta; depois confira.',
    Aplicar:'Aplique a explicação a dois exemplos e confira a análise.',
    Relacionar:'Associe o tópico a algo que você já estudou.',
    Consolidar:'Retome as duas dificuldades que mais se repetiram.',
    Verificar:'Refaça uma atividade anterior sem consultar primeiro.'
  }[action];
  const material=month.availability==='planned'?'Use material revisado ou acompanhamento: esta aula ainda não existe no app.':intro?.instruction??'Use o exemplo inicial. Para outros trechos, consulte uma edição de estudo.';
  return `${approach} ${material}`;
}
function roadmapDayTasks(state) {
  if(state.day>=state.days)return [];
  const month=roadmapMonths[state.month],time=roadmapTime(state.minutes);
  const last=state.day===state.days-1, intro=roadmapIntroWeeks[state.month]?.[state.week];
  const target=intro?.target??month.target;
  const actions=state.days===3?['Conhecer','Aplicar','Verificar']:state.days===5?['Conhecer','Observar','Praticar','Relacionar','Verificar']:['Conhecer','Observar','Praticar','Relacionar','Consolidar','Verificar'];
  return [
    {type:'review',title:'Retomar o que você já estudou',minutes:time.review,description:'Revise palavras vencidas. Se a fila estiver vazia, retome algumas letras, sinais ou palavras conhecidas.',target:'review',availability:'available'},
    {type:'focus',title:`${actions[state.day]}: ${month.weeks[state.week]}`,minutes:time.focus,description:roadmapFocusInstruction(state,month,intro,actions[state.day]),target,availability:month.availability},
    {type:'practice',title:last?'Verificar antes de avançar':'Praticar e registrar uma dificuldade',minutes:time.practice,description:last?'Sem consultar primeiro, explique uma diferença que aprendeu nesta semana e confira em dois exemplos. Se ainda estiver difícil, repita a semana ou reduza o conteúdo.':month.availability==='intro'?'Experimente um treino disponível ou repita uma comparação visual. Registre uma dúvida para retomar, sem avançar por adivinhação.':'Explique com suas palavras o que observou e registre uma dúvida. Não confunda marcar a atividade com comprovar domínio.',target:intro?.practiceTarget??target,availability:month.availability}
  ];
}
function toggleRoadmapTask(id,checked,control) {
  if(!validRoadmapTask(id)||typeof checked!=='boolean')return false;
  const state=getRoadmap();
  const active=roadmapDayTasks(state).map(task=>roadmapTaskId(state,task.type));
  if(!active.includes(id))return false;
  state.done=state.done.filter(item=>item!==id);if(checked)state.done.push(id);
  if(!saveRoadmap(state)){if(control)control.checked=!checked;return false;}
  const progress=roadmapWeekProgress(state),count=$('#roadmapWeekCount');
  if(count)count.textContent=`${progress.count} de ${progress.total} atividades registradas nesta semana.`;
  return true;
}
function toggleRoadmapBook(index,checked,control) {
  if(!Number.isInteger(index)||!roadmapBooks[index]||typeof checked!=='boolean')return false;
  const state=getRoadmap(),book=roadmapBooks[index];
  state.books=state.books.filter(item=>item!==book);if(checked)state.books.push(book);
  if(!saveRoadmap(state)){if(control)control.checked=!checked;return false;}
  const count=$('#roadmapBookCount');if(count)count.textContent=`${state.books.length} de ${roadmapBooks.length} livros marcados como lidos.`;
  roadmapBookGroups.forEach((group,i)=>{
    const summary=$(`#roadmapBookGroup${i}`);
    if(summary)summary.textContent=`${group.title} · ${group.books.filter(name=>state.books.includes(name)).length}/${group.books.length}`;
  });
  return true;
}
function roadmapWeekProgress(state) {
  const prefix=`m${state.month+1}-w${state.week+1}-`;
  const count=state.done.filter(id=>id.startsWith(prefix)&&Number(id.match(/-d(\d)-/)[1])<=state.days).length;
  return {count,total:state.days*3};
}
function openRoadmapActivity(type) {
  const state=getRoadmap(),task=roadmapDayTasks(state).find(item=>item.type===type);
  if(!task)return;
  const intro=roadmapIntroWeeks[state.month]?.[state.week];
  if(task.target==='alphabet'&&intro){alphabetSection=type==='practice'&&intro.letters?'practice':intro.section;selectedLetter=roadmapLetterRange(state,intro)?.[0]??intro.item;}
  if(task.target==='niqqud'&&intro){signsState.niqqud.stage=type==='practice'?3:intro.section;signsState.niqqud.item=intro.item;}
  if(task.target==='dagesh'){signsState.dagesh.stage=0;signsState.dagesh.item=0;}
  setPage(task.target);
}
function roadmapAvailability(status) {
  return {available:'Disponível no app',intro:'Apoio introdutório',sample:'Somente exemplo inicial',planned:'Aula ainda não implementada'}[status];
}
function renderRoadmap(target=$('#content')) {
  const state=getRoadmap();
  target.innerHTML=`<div class="roadmap"><div class="roadmap-lead"><p>Um caminho do alfabeto à leitura acompanhada da Bíblia hebraica. Avance pela compreensão e repita etapas quando precisar.</p><details><summary>Como interpretar os meses e a meta final</summary><p>Este é um roteiro de estudo proposto, não uma previsão de fluência. Cada mês representa um bloco ajustável de quatro semanas, não um calendário com datas ou uma obrigação de terminar no prazo. Os 24 blocos organizam a preparação; ler todos os livros pode exigir muito mais tempo.</p><p>O app ainda não oferece todo esse curso: há introduções, 30 palavras demonstrativas e um exemplo de leitura. Os próximos conteúdos aparecem identificados. Não é possível chegar à leitura integral somente com o acervo atual.</p><p>A meta é a Bíblia hebraica, com consulta quando necessário. Trechos em aramaico exigem estudo à parte; o Novo Testamento está fora desta trilha de hebraico. A lista usa nomes familiares de livros; não representa todas as tradições de cânon.</p></details></div><nav class="roadmap-tabs" aria-label="Visões do plano">${[['week','Minha semana'],['overview','Caminho completo'],['books','Leitura dos livros']].map(([key,label])=>`<button class="btn secondary" id="roadmapView${key}" aria-pressed="${state.view===key}" onclick="changeRoadmap('view','${key}')">${label}</button>`).join('')}</nav><div id="roadmapPanel"></div></div>`;
  if(state.view==='week')renderRoadmapWeek(state);
  if(state.view==='overview')renderRoadmapOverview(state);
  if(state.view==='books')renderRoadmapBooks(state);
}
function renderRoadmapWeek(state) {
  const month=roadmapMonths[state.month],progress=roadmapWeekProgress(state),tasks=roadmapDayTasks(state);
  $('#roadmapPanel').innerHTML=`<section class="lesson"><div class="roadmap-settings"><label for="roadmapMinutes">Tempo por dia<select class="field" id="roadmapMinutes" onchange="changeRoadmap('minutes',Number(this.value),this)">${[20,30,45,60].map(n=>`<option value="${n}" ${n===state.minutes?'selected':''}>${n} minutos</option>`).join('')}</select></label><label for="roadmapDays">Dias por semana<select class="field" id="roadmapDays" onchange="changeRoadmap('days',Number(this.value),this)">${[3,5,6].map(n=>`<option value="${n}" ${n===state.days?'selected':''}>${n} dias</option>`).join('')}</select></label><label for="roadmapMonth">Bloco mensal<select class="field" id="roadmapMonth" onchange="changeRoadmap('month',Number(this.value),this)">${roadmapMonths.map((m,i)=>`<option value="${i}" ${i===state.month?'selected':''}>${i+1}. ${m.title}</option>`).join('')}</select></label></div><p class="muted">Organize os dias na ordem que funcionar para você. Não há punição por pausas; mudar a rotina preserva suas marcações.</p><h2>Mês ${state.month+1} · ${month.title}</h2><div class="roadmap-weeks" role="group" aria-label="Semana do bloco">${month.weeks.map((_,i)=>`<button class="btn secondary" id="roadmapWeek${i}" aria-pressed="${i===state.week}" onclick="changeRoadmap('week',${i})">Semana ${i+1}</button>`).join('')}</div><h3>${month.weeks[state.week]}</h3><p class="roadmap-status">${roadmapAvailability(month.availability)}</p><p class="muted"><span id="roadmapWeekCount" role="status">${progress.count} de ${progress.total} atividades registradas nesta semana.</span> Isso não é uma medida de domínio.</p><div class="roadmap-days" role="group" aria-label="Dia de estudo">${Array.from({length:7},(_,i)=>`<button class="btn secondary" id="roadmapDay${i}" aria-pressed="${i===state.day}" onclick="changeRoadmap('day',${i})">${i<state.days?'Dia '+(i+1):'Pausa '+(i-state.days+1)}</button>`).join('')}</div><div class="roadmap-tasks">${tasks.length?tasks.map(task=>{const id=roadmapTaskId(state,task.type);return `<article class="roadmap-task"><div class="roadmap-task-heading"><h3>${task.title}</h3><span>${task.minutes} min</span></div><p>${task.description}</p><p class="roadmap-status">${roadmapAvailability(task.availability)}</p><div class="roadmap-task-actions"><button class="btn secondary" onclick="openRoadmapActivity('${task.type}')">${task.availability==='planned'?(task.target==='grammar'?'Ver roteiro da gramática':'Ver exemplo inicial de leitura'):task.target==='review'?'Abrir revisão':'Abrir seção de apoio'}</button><label><input type="checkbox" ${state.done.includes(id)?'checked':''} onchange="toggleRoadmapTask('${id}',this.checked,this)"> Atividade realizada${task.availability==='planned'?' com material complementar':''}</label></div></article>`}).join(''):'<div class="roadmap-rest"><h3>Espaço para descansar ou retomar uma dúvida</h3><p>Não há tarefas obrigatórias neste dia. Se quiser estudar, faça uma revisão leve, sem acrescentar conteúdo novo.</p><button class="btn secondary" onclick="setPage(\'review\')">Abrir revisão</button></div>'}</div><details><summary>Critério para avançar neste bloco</summary><p>${month.goal}</p><p>Faça a verificação em mais de um dia. Se ainda depender de adivinhação, retome a semana. As marcações são um registro pessoal, não uma certificação automática.</p></details><div class="vocab-pagination"><button class="btn secondary" ${state.month===0?'disabled':''} onclick="changeRoadmap('month',${state.month-1})">← Mês anterior</button><button class="btn secondary" ${state.month===23?'disabled':''} onclick="changeRoadmap('month',${state.month+1})">Próximo mês →</button></div></section>`;
}
function renderRoadmapOverview(state) {
  $('#roadmapPanel').innerHTML=`<section class="lesson"><h2>O caminho completo</h2><p>Estes são blocos de preparação, não datas de conclusão. Abra uma fase para conhecer os meses e suas quatro semanas.</p><div class="roadmap-phases">${roadmapPhases.map((phase,i)=>`<details ${roadmapMonths[state.month].phase===i?'open':''}><summary>${phase.range} · ${phase.title}</summary><p>${phase.note}</p>${roadmapMonths.map((month,index)=>month.phase===i?`<article class="roadmap-month"><h3>Mês ${index+1} · ${month.title}</h3><span class="roadmap-status">${roadmapAvailability(month.availability)}</span><ol>${month.weeks.map(week=>`<li>${week}</li>`).join('')}</ol><p><strong>Antes de avançar:</strong> ${month.goal}</p><button class="btn secondary" onclick="selectRoadmapMonth(${index})">Ver dias e atividades</button></article>`:'').join('')}</details>`).join('')}</div><details><summary>Como usar o programa sem depender de tradução</summary><p>Observe a imagem, o hebraico com Niqqud e a transliteração. Use “Tenho dúvida” quando precisar do significado. Marcar “Conhecida” indica familiaridade; revisar e ler em contexto são etapas diferentes.</p><p>Aprenda os nomes das letras e sinais como apoio. Na leitura, procure reconhecer a forma e sua função sem precisar recitar cada nome. Não retire o Niqqud cedo; leitura sem sinais deve entrar gradualmente, quando houver base e material apropriado.</p></details></section>`;
}
function selectRoadmapMonth(month) {
  if(!Number.isInteger(month)||!roadmapMonths[month])return false;
  const state=getRoadmap();state.month=month;state.week=0;state.day=0;state.view='week';
  if(!saveRoadmap(state))return false;renderRoadmap();const select=$('#roadmapMonth');if(select)select.focus();return true;
}
function renderRoadmapBooks(state) {
  $('#roadmapPanel').innerHTML=`<section class="lesson"><h2>Da preparação à leitura dos livros</h2><p>Este registro pode continuar por anos. Escolha com orientação trechos adequados ao seu nível; depois avance para livros completos, mantendo Niqqud e ferramentas de consulta.</p><p><strong id="roadmapBookCount" role="status">${state.books.length} de ${roadmapBooks.length} livros marcados como lidos.</strong> Registro manual de leitura, não avaliação automática de compreensão.</p><p>O texto integral e suas análises ainda não estão no app. Use uma edição e recursos revisados; a seção Leitura bíblica contém somente o exemplo inicial.</p><button class="btn secondary" onclick="setPage('reading')">Ver exemplo de leitura disponível</button><div class="roadmap-book-groups">${roadmapBookGroups.map((group,i)=>`<details><summary id="roadmapBookGroup${i}">${group.title} · ${group.books.filter(book=>state.books.includes(book)).length}/${group.books.length}</summary><div class="roadmap-book-list">${group.books.map(book=>`<label><input type="checkbox" ${state.books.includes(book)?'checked':''} onchange="toggleRoadmapBook(${roadmapBooks.indexOf(book)},this.checked,this)"> ${book}</label>`).join('')}</div></details>`).join('')}</div><details><summary>Rotina semanal para ler um livro</summary><ol><li>No primeiro dia, escolha um trecho pequeno, leia com Niqqud e identifique o que já reconhece.</li><li>Nos dias intermediários, releia e avance somente se entender a unidade anterior. Consulte vocabulário e formas quando necessário.</li><li>No último dia de estudo, releia os trechos da semana e confira sua compreensão. Escolha o próximo trecho conforme a dificuldade.</li><li>Use os outros dias para descanso ou revisão leve. Repita esse ciclo até concluir o livro; a extensão dos livros e seu ritmo determinam o tempo.</li></ol></details><details><summary>O que registrar ao longo da leitura?</summary><p>Termine pequenas unidades, releia e confira o sentido com fontes confiáveis. Anote palavras e estruturas recorrentes para retomar. Marque um livro somente depois de concluir a leitura que você está registrando, sem transformar a lista em uma corrida.</p><p>Ao concluir a lista, continue relendo e aprofundando. Uma leitura integral com apoio não significa conhecer todas as palavras ou resolver toda dificuldade de interpretação.</p></details></section>`;
}
