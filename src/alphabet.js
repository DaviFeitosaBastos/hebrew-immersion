/* Presentation and practice for the existing introductory alphabet content. */
let alphabetSection = 'letters';
let selectedLetter = 0;
let alphabetQuestion = null;
const alphabetSections = [['letters', 'Letras'], ['practice', 'Treino']];
const alphabetFinals = { 10: 'ך', 12: 'ם', 13: 'ן', 16: 'ף', 17: 'ץ' };
const alphabetNames = ['Alef', 'Bet', 'Gimel', 'Dalet', 'He', 'Vav', 'Zayin', 'Chet', 'Tet', 'Yod', 'Kaf', 'Lamed', 'Mem', 'Nun', 'Samekh', 'Ayin', 'Pe', 'Tsadi', 'Qof', 'Resh', 'Shin', 'Tav'];
function alphabetGlyph(index) { return alphabet[index][0].split(' / ')[0].replace(/[\u05BC\u05C1\u05C2]/g, ''); }
function alphabetSound(index) {
  const variants = { 1: 'B ou V', 10: 'K ou Kh', 16: 'P ou F', 20: 'SH ou S', 21: 'T (varia conforme a tradição)' };
  return variants[index] || alphabet[index][2];
}

const letterObservations = [
  'Observe os dois pequenos traços ligados por uma diagonal. Compare com a forma mais simples de Ayin: ע.',
  'Observe a base que se estende para a esquerda. Compare ב com כ: a diferença no contorno ajuda a reconhecer as duas.',
  'Observe o traço que desce e o pequeno apoio na base. Compare ג com נ, prestando atenção ao pé da letra.',
  'Observe o canto superior direito. Compare ד com ר: não dependa apenas do tamanho da letra para distingui-las.',
  'Observe a abertura entre o traço esquerdo e a parte superior. Compare ה com ח, cuja parte superior é ligada.',
  'Observe o traço estreito e comprido. Compare ו com י: Yod costuma ser mais curta nesta escrita.',
  'Observe a pequena barra no topo. Compare ז com ו e localize a diferença na cabeça da letra.',
  'Observe a ligação da parte superior com os dois lados. Compare ח com ה, que apresenta uma abertura.',
  'Observe o contorno e a entrada do traço na parte superior. Compare ט com מ, sem tentar decorar as duas ao mesmo tempo.',
  'Observe como esta letra ocupa pouco espaço vertical. Compare י com ו, que desce mais.',
  'Observe o contorno arredondado. Compare כ com ב; sua forma final é ך.',
  'Observe a haste que sobe acima do corpo das outras letras. Esse destaque ajuda a encontrar ל dentro de uma palavra.',
  'Observe a abertura e o desenho da parte superior. Sua forma final ם tem um contorno fechado.',
  'Observe a base da forma נ. No fim da palavra, a forma ן se alonga para baixo.',
  'Observe o contorno fechado e arredondado. Compare ס com ם, prestando atenção aos cantos.',
  'Observe os dois traços que se encontram na parte inferior. Compare ע com א, que tem uma diagonal central.',
  'Observe o pequeno traço que entra no contorno da letra. Compare פ com כ; esse detalhe interno ajuda a diferenciá-las.',
  'Observe os dois braços na parte superior. Sua forma final ץ se alonga para baixo.',
  'Observe o traço que desce abaixo do corpo da letra. Compare ק com ה, sem ignorar essa extensão.',
  'Observe a curva superior. Compare ר com ד, cuja região superior direita é mais marcada nesta fonte.',
  'Observe os três braços da letra. Seu desenho ajuda a reconhecê-la entre as outras.',
  'Observe os dois lados e o pequeno pé na base. Compare ת com ח antes de consultar o nome.'
];

function renderAlphabet(target = $('#content')) {
  target.innerHTML = `<section class="alphabet-course lesson alphabet-copy">
    <div class="alphabet-overview-heading"><span class="eyebrow">22 LETRAS · א–ת</span><p class="alphabet-guide">Comece por Alef, no canto direito. Escolha uma letra para explorar.</p></div><div class="alphabet-workspace"><div><div class="alphabet-reading-order">Ordem de leitura ←</div>
    <div class="alphabetgrid" aria-label="As 22 letras do alfabeto hebraico">${alphabet.map((a, i) => `<button class="lettertile" aria-pressed="${i === selectedLetter}" aria-controls="letterDetail" onclick="showLetter(${i}, true)"><span class="alphabet-letter-number" aria-hidden="true">${i + 1}</span><span class="alphabet-glyphs"><b lang="he" dir="rtl">${alphabetGlyph(i)}</b>${alphabetFinals[i] ? `<span class="alphabet-sofit"><b lang="he" dir="rtl">${alphabetFinals[i]}</b><small>final</small></span>` : ''}</span><span>${alphabetNames[i]}</span></button>`).join('')}</div><p class="alphabet-final-note">A forma menor ao lado é a final (sofit), usada no fim da palavra.</p></div>
    <div id="letterDetail" class="letterdetail" role="region" aria-label="Detalhes da letra"></div></div>
    <details><summary>O básico para começar</summary><p>A letra é o desenho; o nome serve para identificá-la; o som é a pista para ler. Os sinais de leitura são estudados nas outras abas.</p><p>Os sons desta tabela são aproximações introdutórias. Há diferenças entre tradições de leitura e a pronúncia histórica do hebraico bíblico. A tradição e as descrições ainda aguardam revisão editorial; não há áudio disponível.</p></details>
    <details id="alphabetPractice" ${alphabetSection === 'practice' ? 'open' : ''}><summary>Treinar o reconhecimento das letras</summary><p>Escolha o nome da letra. O treino começa pela letra selecionada, sem nota de domínio ou progresso salvo.</p><div class="alphabet-practice"><div class="alphabet-symbol" id="letterQuiz" lang="he" dir="rtl"></div><div class="choices" id="letterChoices"></div><div id="letterFeedback" role="status" aria-live="polite"></div><button class="btn secondary" id="nextLetterQuestion" onclick="newLetterQuiz()" disabled>Próxima letra</button></div></details>
  </section>`;
  showLetter(selectedLetter);
}

function setAlphabetSection(section) {
  // Older bookmarks used separate introduction and final-form pages.
  if (!['start', 'letters', 'finals', 'practice'].includes(section)) return;
  alphabetSection = section === 'practice' ? 'practice' : 'letters';
  if (typeof rememberStudy === 'function') rememberStudy();
  renderAlphabet();
}

function showLetter(index, focusDetail = false) {
  if (!Number.isInteger(index) || !alphabet[index]) return;
  selectedLetter = index;
  if (typeof rememberStudy === 'function') rememberStudy();
  const a = alphabet[index], final = alphabetFinals[index];
  $('#letterDetail').innerHTML = `<article class="alphabet-letter"><div class="alphabet-letter-heading"><span class="alphabet-symbol" lang="he" dir="rtl">${alphabetGlyph(index)}</span><div><span class="eyebrow">LETRA ${index + 1} DE 22</span><h3 id="selectedLetterHeading" tabindex="-1">${alphabetNames[index]}</h3><p class="alphabet-sound"><strong>Som:</strong> ${alphabetSound(index)}.</p>${index === 20 ? '<div class="shin-readings"><div><b lang="he" dir="rtl">שׁ</b><span>Shin · SH</span><small>Ponto à direita</small></div><div><b lang="he" dir="rtl">שׂ</b><span>Sin · S</span><small>Ponto à esquerda</small></div></div>' : ''}${final ? `<p><strong>Forma final (sofit):</strong> <span class="alphabet-final-inline" lang="he" dir="rtl">${final}</span> — usada no fim da palavra; é a mesma letra.</p>` : ''}</div></div><p>${letterObservations[index]}</p></article>`;
  document.querySelectorAll('.alphabetgrid .lettertile').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  newLetterQuiz(index);
  if (focusDetail) $('#selectedLetterHeading').focus();
}

function newLetterQuiz(index) {
  const selected = Number.isInteger(index) && alphabet[index] ? index : Math.floor(Math.random() * alphabet.length);
  const sound = alphabetNames[selected];
  const candidates = [...new Set(alphabetNames)].filter(s => s !== sound);
  // Fisher–Yates keeps alternatives unique and avoids random comparator sorting.
  function shuffle(items) { for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; } return items; }
  const options = shuffle([sound, ...shuffle(candidates).slice(0, 3)]);
  alphabetQuestion = { selected, options, correct: options.indexOf(sound), answered: false };
  $('#letterQuiz').textContent = alphabetGlyph(selected);
  $('#letterChoices').innerHTML = options.map((option, i) => `<button class="choice" onclick="checkLetter(${i})">${option}</button>`).join('');
  $('#letterFeedback').textContent = '';
  $('#nextLetterQuestion').disabled = true;
}

function checkLetter(option) {
  const q = alphabetQuestion;
  if (!q || q.answered || !Number.isInteger(option) || !q.options[option]) return;
  q.answered = true;
  const correct = option === q.correct;
  $('#letterFeedback').textContent = `${correct ? 'Correto!' : 'Vamos observar de novo.'} ${alphabetNames[q.selected]}: ${q.options[q.correct]}. ${letterObservations[q.selected]}`;
  document.querySelectorAll('#letterChoices button').forEach((button, i) => { button.disabled = true; if (i === q.correct) button.classList.add('alphabet-correct'); });
  $('#nextLetterQuestion').disabled = false;
}
