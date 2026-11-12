/* Offline review with guarded sessions and validated persistence. */
const SRS_KEY='hi.srs.v1';
const safeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function getSrs(){
 const value=readProgress(SRS_KEY,{},value=>value&&typeof value==='object'&&!Array.isArray(value));
 const result={};let damaged=false;
 for(const [id,row] of Object.entries(value)){
  if(!/^[1-9][0-9]*$/.test(id)){damaged=true;continue;}
  if(validReviewRow(row))result[id]=row;
  else{damaged=true;result[id]=emptyReviewRow();}
 }
 if(damaged){
  progressRecovery.set(SRS_KEY,JSON.stringify(value));
  progressNotice('Alguns registros de revisão precisam de recuperação. As palavras afetadas voltaram à fila; o original será preservado ao salvar.');
 }
 return result;
}
function saveSrs(value){return writeProgress(SRS_KEY,value)}
function nextReview(id,quality){
 if(!words.some(w=>w.id===id)||![1,3,4,5].includes(quality))return false;
 const s=getSrs(),old=s[id]||emptyReviewRow();
 const repetitions=quality===1?0:old.repetitions+1;
 const factor=quality===3?1.2:Math.max(1.3,old.ease)*(quality===5?1.3:1);
 const interval=quality===1?0:repetitions===1?1:repetitions===2?(quality===3?2:3):Math.min(3650,Math.max(old.interval+1,Math.round(old.interval*factor)));
 const ease=Math.min(4,Math.max(1.3,old.ease+(.1-(5-quality)*(.08+(5-quality)*.02))));
 const row={repetitions,interval,ease,due:Date.now()+(quality===1?10*60000:interval*86400000),attempts:old.attempts+1,correct:old.correct+(quality>=3?1:0)};
 s[id]=row;return saveSrs(s)?row:false;
}
function trackedWords(){const s=getSrs();return words.filter(w=>Boolean(s[w.id])).sort((a,b)=>s[a.id].due-s[b.id].due||a.id-b.id)}
function dueWords(){const s=getSrs();return trackedWords().filter(w=>s[w.id].due<=Date.now())}
function addReviewWords(){
 const s=getSrs(),batch=words.filter(w=>!s[w.id]).slice(0,10);
 if(!batch.length)return 0;
 batch.forEach(w=>{s[w.id]=emptyReviewRow()});
 return saveSrs(s)?batch.length:false;
}
let reviewItems=[],reviewCursor=0,reviewRevealed=false,reviewToken=0,reviewAnswer=null;
function reviewPage(){
 reviewItems=[];reviewCursor=0;reviewRevealed=false;reviewAnswer=null;reviewToken++;
 const s=getSrs(),due=dueWords(),tracked=trackedWords(),remaining=words.length-tracked.length;
 $('#content').innerHTML=`<div id="reviewOverview"><div class="stats"><div class="stat"><small>PARA REVISAR AGORA</small><strong id="reviewDueCount">${due.length}</strong></div><div class="stat"><small>EM REVISÃO</small><strong>${tracked.length}</strong></div><div class="stat"><small>PALAVRAS DISPONÍVEIS</small><strong>${words.length}</strong></div></div>
 <div class="lesson"><h3>Revisão espaçada</h3><p>Reconheça a palavra antes de pedir ajuda. As avaliações são de recordação pessoal e não comprovam domínio. “Não lembrei” traz a palavra de volta em 10 minutos; as outras avaliações agendam a próxima revisão em dias.</p>
 <div class="review-actions"><button class="btn" id="beginReview" ${due.length?'':'disabled'}>Revisar ${due.length} agora</button><button class="btn secondary" id="addReview" ${remaining?'':'disabled'}>${remaining?'Adicionar até 10 palavras ('+remaining+' restantes)':'Todas as palavras estão no treino'}</button><button class="btn secondary" id="refreshReview">Atualizar fila</button></div>
 <p class="muted" id="reviewMessage" role="status">${due.length?'Há palavras disponíveis para revisar.':tracked.length?'Nenhuma revisão pendente agora. As próximas datas estão na fila abaixo.':'Adicione palavras para começar, ou marque uma palavra como conhecida no vocabulário.'}</p></div></div><div id="reviewSession"></div>
 <details class="review-queue"><summary>Fila de estudo · ${tracked.length} palavras</summary><div class="grid">${tracked.map(w=>`<article class="card"><div class="wordhe" lang="he" dir="rtl">${safeText(w.hebrew)}</div><div class="translit">${safeText(w.translit)}</div><p class="muted">${s[w.id].due<=Date.now()?'Disponível agora':'Próxima revisão: '+new Date(s[w.id].due).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'})}</p></article>`).join('')||'<p class="muted">Sua fila ainda está vazia.</p>'}</div></details>`;
 $('#beginReview').onclick=()=>startReview(dueWords());
 $('#refreshReview').onclick=reviewPage;
 $('#addReview').onclick=()=>{const added=addReviewWords();if(added!==false){reviewPage();$('#reviewMessage').textContent=added+' palavras adicionadas ao treino.'}};
}
function startReview(list){
 const dueIds=new Set(dueWords().map(w=>w.id));
 reviewItems=dueWords().filter(w=>list.some(item=>item.id===w.id)&&dueIds.has(w.id));
 reviewCursor=0;reviewRevealed=false;reviewAnswer=null;
 if(!reviewItems.length){reviewPage();return;}
 $('#beginReview').disabled=true;$('#addReview').disabled=true;$('#refreshReview').disabled=true;
 const overview=$('#reviewOverview');if(overview)overview.hidden=true;
 const queue=$('.review-queue');if(queue){queue.open=false;queue.hidden=true;}
 drawReview();
 const target=$('#reviewSession');if(target&&target.scrollIntoView)target.scrollIntoView({block:'start',behavior:'auto'});
}
function drawReview(){
 const target=$('#reviewSession');if(!target)return;
 reviewToken++;reviewRevealed=false;reviewAnswer=null;
 if(reviewCursor>=reviewItems.length){
  reviewPage();const message=$('#reviewMessage');message.textContent='Revisão concluída. As avaliações foram salvas neste computador.';message.tabIndex=-1;message.focus();return;
 }
 const w=reviewItems[reviewCursor];
 target.innerHTML=`<div class="card quiz review-card"><div class="review-session-header"><span id="reviewSessionPosition">Palavra ${reviewCursor+1} de ${reviewItems.length} · ${reviewCursor} avaliadas</span><button class="btn secondary" onclick="reviewPage()">Voltar à fila</button></div><progress class="review-progress" id="reviewProgress" max="${reviewItems.length}" value="${reviewCursor}" aria-label="Progresso da sessão de revisão"></progress><div class="quizvisual">${visuals[w.visual]||'—'}</div><div class="hebrewline" lang="he" dir="rtl">${safeText(w.hebrew)}</div><div class="translit">${safeText(w.translit)}</div><p>Você reconhece esta palavra? Escolha como foi lembrar; depois avance para a próxima palavra.</p><button class="btn secondary" onclick="revealReview(${reviewToken})">Tenho dúvida</button><div id="reviewReveal" aria-live="polite"></div><div class="choices review-grades"><button class="btn secondary" data-grade="1" aria-pressed="false" onclick="gradeReview(1,${reviewToken})">Não lembrei</button><button class="btn secondary" data-grade="3" aria-pressed="false" onclick="gradeReview(3,${reviewToken})">Difícil</button><button class="btn secondary" data-grade="4" aria-pressed="false" onclick="gradeReview(4,${reviewToken})">Lembrei</button><button class="btn secondary" data-grade="5" aria-pressed="false" onclick="gradeReview(5,${reviewToken})">Fácil</button></div><div id="reviewGradeFeedback" class="review-grade-feedback" role="status" aria-live="polite"></div><button class="btn" id="nextReviewWord" onclick="advanceReview(${reviewToken})" hidden>Próxima palavra →</button><p class="muted">Se pedir ajuda, escolha “Não lembrei” ou “Difícil” para registrar a dificuldade.</p></div>`;
 const first=$('#reviewSession button');if(first&&first.focus)first.focus();
}
window.revealReview=token=>{
 const w=reviewItems[reviewCursor];if(token!==reviewToken||reviewRevealed||!w||page!=='review')return;
 reviewRevealed=true;$('#reviewReveal').textContent=w.pt;
};
window.gradeReview=(quality,token)=>{
 const w=reviewItems[reviewCursor];
 if(page!=='review'||token!==reviewToken||reviewAnswer||!w||![1,3,4,5].includes(quality))return;
 const result=nextReview(w.id,quality);
 if(!result)return;
 reviewAnswer={quality,due:result.due};
 document.querySelectorAll('.review-grades button').forEach(button=>{
  const selected=Number(button.getAttribute('data-grade'))===quality;
  button.disabled=true;
  button.setAttribute('aria-pressed',String(selected));
  button.classList.toggle('review-selected',selected);
 });
 const labels={1:'Não lembrei',3:'Difícil',4:'Lembrei',5:'Fácil'};
 $('#reviewGradeFeedback').textContent=`${labels[quality]} ✓ · Avaliação salva. ${quality===1?'Esta palavra volta em 10 minutos.':`Próxima revisão em ${result.interval} ${result.interval===1?'dia':'dias'}.`}`;
 $('#reviewProgress').value=reviewCursor+1;
 $('#reviewSessionPosition').textContent=`Palavra ${reviewCursor+1} de ${reviewItems.length} · ${reviewCursor+1} ${reviewCursor===0?'avaliada':'avaliadas'}`;
 const next=$('#nextReviewWord');next.hidden=false;
 next.textContent=reviewCursor+1===reviewItems.length?'Concluir revisão ✓':'Próxima palavra →';
 next.focus();
};
window.advanceReview=token=>{
 if(page!=='review'||token!==reviewToken||!reviewAnswer)return;
 reviewCursor++;drawReview();
};
function aiPage(){
 $('#content').innerHTML=`<div class="hero"><div><div class="eyebrow">OPCIONAL · REQUER INTERNET</div><h2>Professor de hebraico bíblico com IA</h2><p>O curso continua funcionando offline. Somente sua pergunta e o contexto que você escrever serão enviados ao provedor quando solicitar uma resposta.</p></div><div class="hebrew">לָמַד</div></div>
 <div class="lesson" style="max-width:780px;margin-top:18px">
 <h3>Configurar consulta online</h3><p>Use sua própria chave de API da OpenAI. A chave é mantida somente na memória do processo durante a consulta; o aplicativo não a salva em arquivos nem no armazenamento local. O serviço pode cobrar pelo uso.</p>
 <div class="formrow"><label for="apiKey">Chave de API (não será salva)</label><input class="field" type="password" id="apiKey" autocomplete="off" placeholder="sk-..."></div>
 <div class="formrow"><label for="modelName">Modelo</label><input class="field" id="modelName" value="gpt-4.1-mini" placeholder="Nome de modelo disponível na sua conta"></div>
 <div class="formrow"><label for="question">Sua dúvida</label><textarea class="field" id="question" rows="5" placeholder="Por que בּ é diferente de ב?"></textarea></div>
 <div class="formrow"><label><input type="checkbox" id="confirmSend"> Autorizo enviar esta pergunta e seu contexto para a API online.</label></div>
 <button class="btn" id="askAi">Perguntar à IA</button><div id="aiResult" class="letterdetail">Nenhuma consulta enviada. A IA pode cometer erros: confirme explicações importantes com fontes de hebraico bíblico.</div>
 </div>`;
 $('#askAi').onclick=askAi;
}
async function askAi(){
 const key=$('#apiKey').value.trim(),model=$('#modelName').value.trim(),question=$('#question').value.trim();
 const result=$('#aiResult');if(!$('#confirmSend').checked){result.textContent='Marque a autorização de envio antes de consultar.';return}
 if(!question||!key){result.textContent='Digite uma pergunta e a chave de API.';return}
 if(!window.hebrewAI){result.textContent='Este recurso funciona no aplicativo Electron, não na pré-visualização do navegador.';return}
 $('#askAi').disabled=true;result.textContent='Consultando...';
 try{let r=await window.hebrewAI.ask({key,model,question});result.textContent=r.answer||'A API não retornou texto.'}
 catch(e){result.textContent='Falha na consulta: '+e.message}
 finally{$('#askAi').disabled=false;$('#apiKey').value=''}
}
/* Existing navigation and lesson content is retained. */
titles.ai=['Professor com IA','Tire dúvidas online apenas quando desejar; as aulas permanecem offline.'];
const baseRender=render;
render=function(){
 if(page==='review'){updateProgress();return reviewPage()}
 if(page==='ai'){updateProgress();return aiPage()}
 return baseRender();
};
const oldMark=mark;
mark=function(id){
 if(!oldMark(id))return false;
 const s=getSrs();if(!s[id]){
  s[id]=emptyReviewRow();
  if(!saveSrs(s)){progressNotice('A familiaridade foi salva, mas não foi possível adicionar a palavra à revisão. Tente novamente em “Já conheço” ou “Conhecida ✓”.');return false;}
 }
 return true;
};
window.mark=mark;
