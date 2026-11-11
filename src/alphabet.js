/* Presentation and practice for the existing introductory alphabet content. */
let alphabetSection = 'start';
let selectedLetter = 0;
let alphabetQuestion = null;
const alphabetSections = [['start', '1. Primeiros passos'], ['letters', '2. Conheça as letras'], ['finals', '3. Formas finais'], ['practice', '4. Pratique']];
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
  'Observe o contorno arredondado. Compare כ com ב; depois abra o detalhe das formas finais para estudar ך.',
  'Observe a haste que sobe acima do corpo das outras letras. Esse destaque ajuda a encontrar ל dentro de uma palavra.',
  'Observe a abertura e o desenho da parte superior. Sua forma final ם tem um contorno fechado.',
  'Observe a base da forma נ. No fim da palavra, a forma ן se alonga para baixo.',
  'Observe o contorno fechado e arredondado. Compare ס com ם, prestando atenção aos cantos.',
  'Observe os dois traços que se encontram na parte inferior. Compare ע com א, que tem uma diagonal central.',
  'Observe o pequeno traço que entra no contorno da letra. Compare פ com כ; esse detalhe interno ajuda a diferenciá-las.',
  'Observe os dois braços na parte superior. Sua forma final ץ se alonga para baixo.',
  'Observe o traço que desce abaixo do corpo da letra. Compare ק com ה, sem ignorar essa extensão.',
  'Observe a curva superior. Compare ר com ד, cuja região superior direita é mais marcada nesta fonte.',
  'Observe os três braços e localize o ponto: à direita em שׁ, à esquerda em שׂ. A posição faz parte da distinção que você está estudando.',
  'Observe os dois lados e o pequeno pé na base. Compare ת com ח antes de consultar o nome.'
];

function renderAlphabet(target = $('#content')) {
  target.innerHTML = `<div class="alphabet-course">
    <nav class="alphabet-steps" aria-label="Etapas do alfabeto">${alphabetSections.map(([key, label]) => `<button class="btn secondary" ${alphabetSection === key ? 'aria-current="step"' : ''} onclick="setAlphabetSection('${key}')">${label}</button>`).join('')}</nav>
    <div id="alphabetPanel"></div></div>`;
  const panel = $('#alphabetPanel');
  if (alphabetSection === 'start') {
    panel.innerHTML = `<section class="lesson alphabet-copy"><span class="eyebrow">ANTES DE MEMORIZAR</span><h3>O que você está aprendendo aqui?</h3><p>O alfabeto tem 22 letras. Nesta etapa, seu objetivo é reconhecer o desenho de cada uma, conhecer seu nome e relacioná-la à indicação de som apresentada no curso.</p>
      <div class="alphabet-explainer"><span class="alphabet-symbol" lang="he" dir="rtl">בּ</span><div><h4>Forma, nome e som são informações diferentes</h4><p><strong>Forma:</strong> o desenho que você vê. <strong>Nome:</strong> Bet, uma referência para falar sobre a letra. <strong>Som:</strong> B, na apresentação de בּ usada aqui. Você pode reconhecer o som sem precisar recitar o nome primeiro.</p></div></div>
      <h4>Leia da direita para a esquerda</h4><p>Nas sequências hebraicas, comece pelo lado direito. Observe uma letra por vez. O texto explicativo em português continua sendo lido normalmente, da esquerda para a direita.</p>
      <details><summary>E os pontos e pequenos sinais?</summary><p>O desenho da letra e os sinais que a acompanham precisam ser observados juntos. Niqqud é o nome do conjunto de sinais usado para indicar vogais e outros aspectos da leitura. Você os estudará em um módulo próprio; não precisa decorar seus nomes agora.</p><p>Alguns pontos também distinguem formas apresentadas neste alfabeto, como בּ / ב e שׁ / שׂ. Ao explorar cada letra, repare tanto no contorno quanto na posição dos pontos.</p></details>
      <details><summary>Como interpretar as indicações de pronúncia?</summary><p>As indicações deste protótipo são aproximações para ajudar a começar. Letras como “H”, “Kh” e “SH” são pistas de leitura, não uma gravação de pronúncia. Há diferenças entre tradições de leitura e a pronúncia histórica do hebraico bíblico.</p><p>A tradição adotada e as descrições fonéticas ainda precisam de revisão editorial. Não trate esta tabela como reconstrução completa da pronúncia antiga. O módulo ainda não oferece áudio.</p></details>
      <div class="alphabet-next"><p>Para começar: escolha uma letra, observe sua forma e compare somente com a letra indicada no detalhe.</p><button class="btn" onclick="setAlphabetSection('letters')">Explorar as letras →</button></div></section>`;
  } else if (alphabetSection === 'letters') {
    panel.innerHTML = `<section class="lesson alphabet-copy"><div id="letterDetail"></div><details id="letterPicker"><summary>Escolher outra letra · ver as 22</summary><div class="alphabetgrid">${alphabet.map((a, i) => `<button class="lettertile" aria-pressed="${i === selectedLetter}" onclick="showLetter(${i})"><b lang="he" dir="rtl">${a[0].split(' / ')[0]}</b><span>${a[1]}</span></button>`).join('')}</div></details></section>`;
    showLetter(selectedLetter);
  } else if (alphabetSection === 'finals') {
    panel.innerHTML = `<section class="lesson alphabet-copy"><span class="eyebrow">O MESMO ALFABETO, OUTRA FORMA</span><h3>Cinco letras mudam de desenho no fim da palavra</h3><p>Essas formas não são cinco letras novas. Elas correspondem a Kaf, Mem, Nun, Pe e Tsadi quando aparecem no final de uma palavra. Nesta etapa, concentre-se em reconhecer os pares.</p><div class="alphabet-finals">${[['כ','ך','Kaf'],['מ','ם','Mem'],['נ','ן','Nun'],['פ','ף','Pe'],['צ','ץ','Tsadi']].map(([normal, final, name]) => `<article><h4>${name}</h4><div class="final-pair"><div><span lang="he" dir="rtl">${normal}</span><small>Forma comum</small></div><span aria-hidden="true">↔</span><div><span lang="he" dir="rtl">${final}</span><small>No fim da palavra</small></div></div></article>`).join('')}</div><details><summary>Como estudar sem confundir as formas?</summary><p>Escolha um par. Olhe a forma comum, cubra-a e tente identificar sua correspondente final. Depois faça o caminho inverso. Só acrescente outro par quando conseguir distinguir o primeiro.</p><p>As letras aqui estão sem sinais para destacar o contorno. Isso não significa retirar o Niqqud do vocabulário básico. Pontos e pronúncia serão retomados nas lições específicas.</p></details><button class="btn secondary" onclick="setAlphabetSection('letters')">Voltar às letras</button></section>`;
  } else {
    panel.innerHTML = `<section class="lesson alphabet-copy"><h3>Reconheça a letra que você acabou de estudar</h3><p>A primeira questão usa a letra selecionada na etapa anterior. Escolha a indicação de som correspondente; depois confira o feedback antes de seguir.</p><p class="muted">Treino visual com descrições escritas. Não há áudio, nota de domínio ou progresso salvo neste exercício.</p><div class="alphabet-practice"><div class="alphabet-symbol" id="letterQuiz" lang="he" dir="rtl"></div><div class="choices" id="letterChoices"></div><div id="letterFeedback" role="status" aria-live="polite"></div><button class="btn secondary" id="nextLetterQuestion" onclick="newLetterQuiz()" disabled>Próxima letra</button></div></section>`;
    newLetterQuiz(selectedLetter);
  }
}

function setAlphabetSection(section) {
  if (!alphabetSections.some(([key]) => key === section)) return;
  alphabetSection = section;
  if (typeof rememberStudy === 'function') rememberStudy();
  renderAlphabet();
  const heading = $('#alphabetPanel h3');
  if (heading) { heading.tabIndex = -1; heading.focus(); }
}

function showLetter(index) {
  if (!Number.isInteger(index) || !alphabet[index]) return;
  selectedLetter = index;
  if (typeof rememberStudy === 'function') rememberStudy();
  const picker = $('#letterPicker'); if (picker) picker.open = false;
  const a = alphabet[index];
  $('#letterDetail').innerHTML = `<article class="alphabet-letter"><div class="alphabet-letter-heading"><span class="alphabet-symbol" lang="he" dir="rtl">${a[0].split(' / ')[0]}</span><div><span class="eyebrow">LETRA ${index + 1} DE 22</span><h3>${a[1]}</h3><p><strong>Indicação de som:</strong> ${a[2]}.</p></div></div><h4>Onde prestar atenção</h4><p>${letterObservations[index]}</p><details><summary>Ver formas apresentadas e como estudar</summary><div class="hebrewline" lang="he" dir="rtl">${a[0]}</div><p>Observe cada forma separadamente. Primeiro encontre o contorno; depois confira pontos e diferenças de posição. As formas finais são explicadas na próxima etapa. Você não precisa decorar todas as variantes na primeira passagem.</p><p>As descrições de som são introdutórias e ainda aguardam revisão da tradição de pronúncia. Não há áudio disponível.</p></details><div class="alphabet-letter-actions"><button class="btn secondary" onclick="showLetter(${index - 1})" ${index === 0 ? 'disabled' : ''}>← Anterior</button><button class="btn secondary" onclick="showLetter(${index + 1})" ${index === alphabet.length - 1 ? 'disabled' : ''}>Seguinte →</button><button class="btn" onclick="setAlphabetSection('practice')">Praticar esta letra</button></div></article>`;
  document.querySelectorAll('.alphabetgrid .lettertile').forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
}

function newLetterQuiz(index) {
  const selected = Number.isInteger(index) && alphabet[index] ? index : Math.floor(Math.random() * alphabet.length);
  const sound = alphabet[selected][2].split(';')[0];
  const candidates = [...new Set(alphabet.map(a => a[2].split(';')[0]))].filter(s => s !== sound);
  // Fisher–Yates keeps alternatives unique and avoids random comparator sorting.
  function shuffle(items) { for (let i = items.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [items[i], items[j]] = [items[j], items[i]]; } return items; }
  const options = shuffle([sound, ...shuffle(candidates).slice(0, 3)]);
  alphabetQuestion = { selected, options, correct: options.indexOf(sound), answered: false };
  $('#letterQuiz').textContent = alphabet[selected][0].split(' / ')[0];
  $('#letterChoices').innerHTML = options.map((option, i) => `<button class="choice" onclick="checkLetter(${i})">${option}</button>`).join('');
  $('#letterFeedback').textContent = '';
  $('#nextLetterQuestion').disabled = true;
}

function checkLetter(option) {
  const q = alphabetQuestion;
  if (!q || q.answered || !Number.isInteger(option) || !q.options[option]) return;
  q.answered = true;
  const correct = option === q.correct;
  $('#letterFeedback').textContent = `${correct ? 'Correto!' : 'Vamos observar de novo.'} ${alphabet[q.selected][1]}: ${q.options[q.correct]}. ${letterObservations[q.selected]}`;
  document.querySelectorAll('#letterChoices button').forEach((button, i) => { button.disabled = true; if (i === q.correct) button.classList.add('alphabet-correct'); });
  $('#nextLetterQuestion').disabled = false;
}
