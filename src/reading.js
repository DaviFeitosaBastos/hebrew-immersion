/* Offline guided reading. Selection records position, never mastery. */
const READING_KEY = 'hi.reading.v1';
const readingDefault = { passage: 'Gen.1.1', word: -1, clean: false };
const readingState = readProgress(READING_KEY, readingDefault, value =>
  value && readingPassages.some(p => p.id === value.passage) && Number.isInteger(value.word) &&
  value.word >= -1 && value.word < readingPassages.find(p => p.id === value.passage).words.length && typeof value.clean === 'boolean');
let readingHasStoredPosition = readingState !== readingDefault;
let readingSaveSucceeded = true;
let readingBookmarkSucceeded = true;
let readingConsultation = false;
function readingPositionText() {
  return `${readingState.word >= 0 ? `Palavra ${readingState.word + 1} de ${currentReading().words.length} · ` : ''}${readingSaveSucceeded ? (readingBookmarkSucceeded ? 'Sua posição é salva neste dispositivo.' : 'Sua posição de leitura foi salva, mas o atalho Continuar não pôde ser atualizado.') : 'Não foi possível salvar esta posição. Ela está disponível somente nesta sessão.'}`;
}
function consultReading(course) {
  if (!['niqqud','dagesh'].includes(course)) return;
  readingConsultation = true; setPage(course);
}
function currentReading() { return readingPassages.find(p => p.id === readingState.passage) || readingPassages[0]; }
function saveReading() {
  const saved = writeProgress(READING_KEY, readingState);
  const bookmarkSaved = typeof rememberStudy === 'function' ? rememberStudy() : true;
  readingSaveSucceeded = saved;
  readingBookmarkSucceeded = bookmarkSaved !== false;
  if (saved) readingHasStoredPosition = true;
  return saved && readingBookmarkSucceeded;
}
function renderReading(target = $('#content')) {
  const passage = currentReading();
  const books = [...new Set(readingPassages.map(p => p.book))];
  const chapters = [...new Set(readingPassages.filter(p => p.book === passage.book).map(p => p.chapter))];
  const verses = readingPassages.filter(p => p.book === passage.book && p.chapter === passage.chapter);
  target.innerHTML = `<div class="lesson reading-course"><div class="reading-toolbar"><label>Livro<select id="readingBookSelect" class="field" onchange="chooseReadingBook(this.value)">${books.map(book => `<option ${book === passage.book ? 'selected' : ''}>${book}</option>`).join('')}</select></label><label>Capítulo<select id="readingChapterSelect" class="field" onchange="chooseReadingChapter(Number(this.value))">${chapters.map(ch => `<option ${ch === passage.chapter ? 'selected' : ''}>${ch}</option>`).join('')}</select></label><label>Versículo<select id="readingVerseSelect" class="field" onchange="chooseReading(this.value)">${verses.map(p => `<option value="${p.id}" ${p.id === passage.id ? 'selected' : ''}>${p.verse}</option>`).join('')}</select></label><button id="readingModeButton" class="btn secondary" aria-pressed="${readingState.clean}" onclick="toggleReadingMode()">Leitura limpa</button></div><h3>Laboratório de leitura — ${passage.book} ${passage.chapter}:${passage.verse}</h3><p class="reading-focus" ${readingState.clean ? 'hidden' : ''}>${passage.focus} · ${passage.goal}</p><div class="hebrewline reading-verse" lang="he" dir="rtl">${passage.words.map(w => w.hebrew).join(' ')}</div><div ${readingState.clean ? 'hidden' : ''} id="readingGuidance"><p>Leia da direita para a esquerda. Selecione uma palavra para ver a leitura e uma observação; o significado fica oculto até você pedir.</p><div class="versewords" lang="he" dir="rtl">${passage.words.map((w,i) => `<button class="verseword" aria-pressed="${readingState.word === i}" aria-controls="verseInfo" onclick="verseInfo(${i})">${w.hebrew}</button>`).join('')}</div><div id="verseInfo" class="letterdetail" role="region" aria-label="Palavra selecionada">Selecione uma palavra para ver sua observação.</div></div><details class="reading-translation"><summary>Revelar tradução de apoio do trecho</summary><p>${passage.translation}</p><small>Tradução didática própria; não substitui uma edição bíblica revisada.</small></details><p class="reading-position" role="status">${readingPositionText()}</p><details class="reading-source"><summary>Sobre esta coleção</summary><p>Coleção piloto de quatro passagens. Texto hebraico: Westminster Leningrad Codex (domínio público), via Open Scriptures Hebrew Bible. Morfologia OSHB: Daniel Owens, David Troidl e colaboradores, CC BY 4.0 (creativecommons.org/licenses/by/4.0/). Fonte: github.com/openscriptures/morphhb.</p><p>Apresentação adaptada sem cantilação e Meteg; palavras ligadas por maqqef aparecem separadas para seleção. Notas e traduções são didáticas, ainda sem revisão linguística independente. Transliteração simplificada de orientação moderna, sem reconstruir a pronúncia antiga; não há áudio. Nem todos os capítulos estão disponíveis.</p></details></div>`;
  if (readingState.word >= 0) renderReadingWord(readingState.word);
}
function chooseReading(id, focusControl = 'readingVerseSelect') {
  if (!readingPassages.some(p => p.id === id)) return;
  readingState.passage = id; readingState.word = -1;
  saveReading(); renderReading();
  const control = $('#'+focusControl); if (control) control.focus();
}
function chooseReadingBook(book) { const first = readingPassages.find(p => p.book === book); if (first) chooseReading(first.id,'readingBookSelect'); }
function chooseReadingChapter(chapter) { const first = readingPassages.find(p => p.book === currentReading().book && p.chapter === chapter); if (first) chooseReading(first.id,'readingChapterSelect'); }
function toggleReadingMode() { readingState.clean = !readingState.clean; saveReading(); renderReading(); $('#readingModeButton').focus(); }
function verseInfo(index) {
  if (!Number.isInteger(index) || !currentReading().words[index]) return;
  readingState.word = index; saveReading(); renderReadingWord(index);
  document.querySelectorAll('.verseword').forEach((button,i) => button.setAttribute('aria-pressed',String(index === i)));
  $('#readingWordHeading').focus();
  $('.reading-position').textContent = readingPositionText();
}
function renderReadingWord(index) {
  const word = currentReading().words[index];
  if (!word) return;
  $('#verseInfo').innerHTML = `<div class="hebrewline" lang="he" dir="rtl" id="readingWordHeading" tabindex="-1">${word.hebrew}</div><div class="translit">${word.translit}</div><p>${word.note}</p><button class="btn secondary tiny" aria-expanded="false" onclick="this.nextElementSibling.hidden=!this.nextElementSibling.hidden;this.setAttribute('aria-expanded',String(!this.nextElementSibling.hidden))">Revelar português</button><p hidden>${word.meaning}</p><details><summary>Observar os sinais desta palavra</summary><p>${word.hebrew.includes('ְ') ? 'Há Sheva: dois pontos verticais abaixo de uma letra. Sua leitura depende do contexto. ' : ''}${word.hebrew.includes('ּ') ? 'Há um ponto interior. A letra e o contexto são necessários para identificar sua função. ' : ''}Observe a posição dos sinais em relação às letras.</p><div class="reading-links"><button class="btn secondary tiny" onclick="consultReading('niqqud')">Consultar Niqqud</button><button class="btn secondary tiny" onclick="consultReading('dagesh')">Consultar Dagesh e sinais</button></div></details>`;
}
