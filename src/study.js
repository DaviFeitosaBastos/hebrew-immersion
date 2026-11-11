/* Presentation helpers and local bookmarks; bookmarks do not imply mastery. */
let vocabCategory = 'all', vocabOffset = 0, vocabView = 'study';
const STUDY_KEY = 'hi.study.v1';
const studyPages = ['vocab', 'practice', 'alphabet', 'niqqud', 'dagesh', 'grammar', 'reading'];
function getStudyLocation() {
  return readProgress(STUDY_KEY, null, value => value && studyPages.includes(value.page) &&
    typeof value.section === 'string' && Number.isInteger(value.item) && value.item >= 0 && value.item < 100 &&
    typeof value.category === 'string' && value.category.length <= 80 &&
    Number.isSafeInteger(value.offset) && value.offset >= 0 && ['study', 'library'].includes(value.view));
}
function rememberStudy() {
  if (!studyPages.includes(page)) return;
  let section = '', item = 0;
  if (page === 'practice') item = words.length ? quizIndex % words.length : 0;
  if (page === 'alphabet') { section = alphabetSection; item = selectedLetter; }
  if (page === 'niqqud' || page === 'dagesh') { section = String(signsState[page].stage); item = signsState[page].item; }
  writeProgress(STUDY_KEY, { page, section, item, category: vocabCategory, offset: vocabOffset, view: vocabView });
}
function resumeStudy() {
  const location = getStudyLocation();
  if (!location) { setPage('alphabet'); return; }
  if (location.page === 'alphabet') {
    alphabetSection = alphabetSections.some(([key]) => key === location.section) ? location.section : 'start';
    selectedLetter = alphabet[location.item] ? location.item : 0;
  }
  if (location.page === 'niqqud' || location.page === 'dagesh') {
    const state = signsState[location.page];
    state.stage = /^[0-3]$/.test(location.section) ? Number(location.section) : 0;
    state.item = signsCourses[location.page].items[location.item] ? location.item : 0;
  }
  if (location.page === 'practice') quizIndex = words[location.item] ? location.item : 0;
  vocabCategory = location.category;
  vocabOffset = location.offset;
  vocabView = location.view;
  setPage(location.page);
}
function homePage(target) {
  const location = getStudyLocation(), due = dueWords().length;
  target.innerHTML = `<div class="home-actions"><section class="lesson"><h2>${location ? 'Continue seu estudo' : 'Comece pelo alfabeto'}</h2><p>${location ? `Última seção: ${titles[location.page][0]}. Sua posição foi guardada neste dispositivo.` : 'Conheça as letras, seus nomes e formas. Depois avance para os sinais de leitura.'}</p><button class="btn" onclick="resumeStudy()">${location ? 'Continuar de onde parei' : 'Estudar o alfabeto'}</button></section><section class="lesson"><h2>Revisão de hoje</h2><p>${due ? `${due} palavras aguardam revisão.` : 'Nenhuma palavra pendente agora.'}</p><button class="btn secondary" onclick="setPage('review')">${due ? 'Revisar palavras' : 'Ver minha revisão'}</button></section></div><div class="sectionhead"><h2>Explore o curso</h2><button class="btn secondary" onclick="setPage('roadmap')">Ver plano de estudos</button></div><div class="grid">${[['alphabet','Alfabeto','Letras, nomes e formas finais.'],['niqqud','Niqqud','Observe os sinais de leitura.'],['dagesh','Dagesh','Entenda o ponto e seus usos.']].map(([key,name,description])=>`<section class="lesson"><h3>${name}</h3><p>${description}</p><button class="btn secondary" onclick="setPage('${key}')">Abrir</button></section>`).join('')}</div><p class="home-summary">${getLearned().filter(id=>words.some(w=>w.id===id)).length} de ${words.length} palavras conhecidas · Conteúdo introdutório · Estudo local</p>`;
}
function filteredVocabulary() { return words.filter(w => vocabCategory === 'all' || w.category === vocabCategory); }
function vocabularyPage(target = $('#content')) {
  const categories = [...new Set(words.map(w=>w.category))];
  if (vocabCategory !== 'all' && !categories.includes(vocabCategory)) vocabCategory = 'all';
  const list = filteredVocabulary(), size = vocabView === 'study' ? 6 : 12;
  vocabOffset = Math.min(Math.floor(vocabOffset / size) * size, Math.max(0, Math.floor((list.length - 1) / size) * size));
  const batch = list.slice(vocabOffset, vocabOffset + size);
  target.innerHTML = `<div class="vocab-toolbar"><div class="view-switch" aria-label="Apresentação do vocabulário"><button class="btn secondary" aria-pressed="${vocabView==='study'}" onclick="setVocabularyView('study')">Estudar em grupos</button><button class="btn secondary" aria-pressed="${vocabView==='library'}" onclick="setVocabularyView('library')">Biblioteca</button></div><label for="vocabTheme">Tema<select class="field" id="vocabTheme" onchange="setVocabularyCategory(this.value)"><option value="all">Todos os temas</option>${categories.map(category=>`<option ${vocabCategory===category?'selected':''}>${safeText(category)}</option>`).join('')}</select></label></div><p class="vocab-range" role="status">${list.length ? `${vocabOffset+1}–${vocabOffset+batch.length} de ${list.length} palavras` : 'Nenhuma palavra neste tema'} · ${vocabView==='study'?'Um grupo por vez':'Biblioteca por tema'}</p><div class="grid vocabulary-grid">${batch.map(card).join('')}</div><div class="vocab-pagination"><button class="btn secondary" onclick="moveVocabulary(-1)" ${vocabOffset===0?'disabled':''}>← Anterior</button><button class="btn" onclick="moveVocabulary(1)" ${vocabOffset+size>=list.length?'disabled':''}>Próximo grupo →</button></div>`;
}
function setVocabularyView(view) {
  if (!['study','library'].includes(view)) return;
  vocabView = view; vocabOffset = 0; vocabularyPage(); rememberStudy();
}
function setVocabularyCategory(category) {
  if (category !== 'all' && !words.some(w=>w.category===category)) return;
  vocabCategory = category; vocabOffset = 0; vocabularyPage(); rememberStudy();
}
function moveVocabulary(direction) {
  if (![1,-1].includes(direction)) return;
  const size = vocabView === 'study' ? 6 : 12, next = vocabOffset + direction * size;
  if (next < 0 || next >= filteredVocabulary().length) return;
  vocabOffset = next; vocabularyPage(); rememberStudy();
  const heading = $('.vocab-range'); if (heading) { heading.tabIndex = -1; heading.focus(); }
}
