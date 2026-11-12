/* Local introductory content, reorganized from the existing lessons. */
const signsCourses = {
  niqqud: {
    title: 'Aprenda a observar os sinais de leitura',
    intro: 'Comece pela posição e pelo desenho. Explore um sinal por vez; as diferenças de pronúncia e de contexto aparecem nos detalhes.',
    stages: ['Primeiros passos', 'Explore os sinais', 'Compare com calma', 'Pratique'],
    opening: `<h3>Uma letra, mais uma informação para ler</h3><p>Você já começou a reconhecer as consoantes no alfabeto. O Niqqud acrescenta sinais à escrita: eles representam vogais e outros elementos da leitura. Por isso, observar apenas o contorno da letra não basta.</p><div class="signs-comparison"><div><span lang="he" dir="rtl">ב</span><small>Observe a letra</small></div><div><span lang="he" dir="rtl">בַ</span><small>Agora localize o sinal abaixo</small></div></div><h4>Uma rotina simples para estudar</h4><ol><li>Identifique a letra que você já conhece.</li><li>Localize o sinal: abaixo, acima ou junto da letra.</li><li>Observe sua forma antes de consultar o nome.</li><li>Confira a indicação de leitura no detalhe e compare com outro sinal.</li></ol><details><summary>Preciso decorar todos os nomes agora?</summary><p>Não. Os nomes ajudam a conversar sobre a escrita e a consultar explicações. Primeiro tente reconhecer o desenho e a posição; depois associe o nome ao que você já consegue ver.</p></details><details><summary>Como interpretar as vogais apresentadas aqui?</summary><p>As letras a, e, i, o e u são indicações introdutórias. As categorias de vogais longas e breves e sua realização dependem da tradição e da análise gramatical. Não tente decidir toda a pronúncia de uma palavra apenas por esta tabela.</p><p>Este módulo ainda não oferece áudio nem um curso completo das regras de leitura. A tradição de pronúncia e o conteúdo continuam aguardando revisão editorial.</p></details>`,
    items: [
      ['בַ','Patach','Um pequeno traço horizontal abaixo da letra.','Indicação introdutória: a.','Compare com Qamats: observe o desenho completo, não apenas a presença de um traço.'],
      ['בָ','Qamats','Um sinal com traço horizontal e uma pequena parte abaixo dele.','A tabela introdutória apresenta a, com variação histórica e contextual.','Não conclua que todo Qamats terá a mesma realização em qualquer contexto; compare com Qamats Qatan no grupo de leitura contextual.'],
      ['בֶ','Segol','Três pontos abaixo da letra.','Indicação introdutória: e.','Compare com Tsere, que tem dois pontos. Conte os pontos antes de olhar o nome.'],
      ['בֵ','Tsere','Dois pontos lado a lado abaixo da letra.','Indicação introdutória: e.','Segol e Tsere são sinais diferentes, mesmo quando uma aproximação escrita usa a mesma letra e.'],
      ['בִ','Hiriq','Um ponto abaixo da letra.','Indicação introdutória: i.','Compare a posição com Holam: um ponto abaixo e um ponto acima não são o mesmo sinal.'],
      ['בֹ','Holam','Um ponto acima da letra.','Indicação introdutória: o.','Observe a posição do ponto em relação ao corpo da letra, em vez de procurar apenas um ponto na linha.'],
      ['בֻ','Qubuts','Três pontos em disposição diagonal abaixo da letra.','Indicação introdutória: u.','Compare com Segol: ambos têm três pontos, mas a disposição é diferente.'],
      ['וּ','Shuruq','A forma ו com um ponto no seu interior.','Indicação introdutória: u.','Aqui o exemplo é וּ, apresentado por inteiro. Não acrescente uma consoante antes dele para representar o próprio sinal.'],
      ['בְ','Sheva','Dois pontos em disposição vertical abaixo da letra.','Pode indicar ausência de vogal ou uma vogal muito breve, conforme o contexto.','Reconhecer o desenho é o primeiro passo. Decidir entre sheva vocal e quiescente exige contexto; não atribua automaticamente um som a toda ocorrência.'],
      ['אֲ','Hataf Patach','Um traço e dois pontos verticais abaixo da letra.','Vogal reduzida da família de a; transliteração didática: ă.','Hataf significa aqui uma categoria de vogal reduzida. Observe a diferença em relação ao Patach simples.'],
      ['אֱ','Hataf Segol','O desenho do Segol acompanhado de dois pontos verticais.','Vogal reduzida da família de e; transliteração didática: ĕ.','Conte o conjunto inteiro. Os pontos verticais não são uma segunda vogal para ler separadamente.'],
      ['אֳ','Hataf Qamats','O desenho do Qamats acompanhado de dois pontos verticais.','Vogal reduzida da família de o; transliteração didática: ŏ.','Não confunda o nome com uma indicação de a: a classificação didática deste Hataf é da família de o.'],
      ['בָ','Qamats Qatan','Pode ter o mesmo desenho do Qamats já estudado.','Nesta convenção didática, indica o, e não a.','Também chamado Qamats Hatuf. Não decida pelo desenho isolado; a análise depende da palavra e do contexto. Algumas edições o distinguem graficamente.'],
      ['וֹ','Holam com Vav','Um ponto no alto da forma ו.','Quando Vav funciona como letra vocálica, a combinação indica o.','Também chamado Holam male. Não é um ponto vocálico novo: é uma forma de escrever a vogal com uma letra.'],
      ['בִי','Hiriq com Yod','Um ponto sob a consoante, seguido de י.','Quando Yod é letra vocálica, a combinação indica i.','Yod não acrescenta um som de y nessa função. O conjunto mostrado é um esquema de escrita, não uma palavra.'],
      ['בֵי','Tsere com Yod','Dois pontos sob a consoante, seguidos de י.','Quando Yod é letra vocálica, a combinação indica e.','Compare com Hiriq com Yod: a letra de apoio é a mesma, mas o sinal abaixo da consoante muda.'],
      ['בֶי','Segol com Yod','Três pontos sob a consoante, seguidos de י.','Quando Yod é letra vocálica, a combinação indica e.','Compare com Tsere com Yod. Aprender os dois desenhos ajuda a reconhecer a grafia sem tratá-los como intercambiáveis.'],
      ['וֺ','Holam ḥaser em Vav','Nesta notação editorial, o ponto acompanha um Vav consonantal.','Vav conserva função consonantal; Holam indica a vogal o.','U+05BA é uma marca específica para Vav. Sua posição pode variar por fonte; não a use sobre outra letra nem a confunda com a combinação vocálica וֹ.']
    ],
    comparison: `<h3>Compare uma diferença de cada vez</h3><p>Não tente memorizar a tabela inteira. Escolha um par e diga o que muda no desenho, antes de tentar pronunciá-lo.</p><div class="signs-comparison"><div><span lang="he" dir="rtl">בֶ</span><small>Segol · três pontos</small></div><div><span lang="he" dir="rtl">בֵ</span><small>Tsere · dois pontos</small></div></div><p>Os dois recebem uma aproximação com e nesta introdução. Isso não torna os sinais intercambiáveis. Aqui, a tarefa é perceber e nomear a diferença visual.</p><details><summary>Mais uma comparação: Hiriq e Holam</summary><div class="signs-comparison"><div><span lang="he" dir="rtl">בִ</span><small>Hiriq · abaixo · i</small></div><div><span lang="he" dir="rtl">בֹ</span><small>Holam · acima · o</small></div></div><p>Primeiro aponte onde está o ponto. Depois consulte a indicação de vogal. A posição ajuda a diferenciar os sinais.</p></details><details><summary>Por que Sheva fica para uma observação separada?</summary><p>Seu desenho é fácil de localizar, mas sua leitura depende do contexto. Os termos vocal e quiescente distinguem, respectivamente, uma leitura com vogal e uma situação sem vogal. A introdução visual não substitui as regras necessárias para analisar uma palavra.</p></details><details><summary>Os três Hataf: o que muda?</summary><div class="signs-comparison"><div><span lang="he" dir="rtl">אֲ</span><small>Hataf Patach · ă</small></div><div><span lang="he" dir="rtl">אֱ</span><small>Hataf Segol · ĕ</small></div><div><span lang="he" dir="rtl">אֳ</span><small>Hataf Qamats · ŏ</small></div></div><p>Esses sinais aparecem sobretudo com א, ה, ח e ע, chamadas guturais. Aqui usamos Alef como apoio visual; as combinações não são palavras.</p></details><details><summary>Qamats e Qamats Qatan: por que o desenho não basta?</summary><div class="signs-comparison"><div><span lang="he" dir="rtl">בָ</span><small>Qamats · aproximação a</small></div><div><span lang="he" dir="rtl">בָ</span><small>Qamats Qatan · aproximação o</small></div></div><p>As duas funções podem compartilhar a mesma forma. Algumas edições usam בׇ para destacar Qamats Qatan; não espere essa distinção em todo texto.</p></details><details><summary>O que é uma letra vocálica?</summary><p>Yod ou Vav podem ajudar a escrever uma vogal, em vez de representar uma consoante nessa posição. Por isso, Hiriq com Yod e Holam com Vav são combinações de escrita, não novos sinais isolados.</p><p>Essas indicações seguem uma convenção didática de gramáticas bíblicas. Não descrevem todas as tradições de pronúncia nem a duração exata de cada vogal.</p></details><details><summary>Patach furtivo é outro sinal?</summary><p>Não: é um uso do Patach. No caso furtivo, a vogal é lida antes da consoante final, como em חַ ou עַ nessa função. Identificar a ocorrência exige contexto; não aplique a regra a qualquer Patach.</p></details><p>Continue estudando o vocabulário com Niqqud. Reconhecer alguns sinais ainda não é motivo para retirá-los das palavras.</p>`
  },
  dagesh: {
    title: 'Entenda o ponto antes de decorar a regra',
    intro: 'Separe três perguntas: onde está o ponto, qual é a letra e o que o contexto permite concluir. Estude os dois usos do Dagesh em etapas.',
    stages: ['Primeiros passos', 'Qal e Chazaq', 'Outros sinais', 'Pratique'],
    opening: `<h3>Ver um ponto é o começo da análise</h3><p>Dagesh é um ponto no interior de uma letra. O curso distingue dois usos: Qal e Chazaq. O desenho do ponto, sozinho, não informa qual desses usos está presente; é preciso considerar a letra e o contexto.</p><div class="signs-comparison"><div><span lang="he" dir="rtl">ב</span><small>Sem ponto interior</small></div><div><span lang="he" dir="rtl">בּ</span><small>Com ponto interior</small></div></div><h4>Antes de estudar os dois usos</h4><p>Uma <strong>consoante</strong> é o tipo de som representado pelas letras estudadas no alfabeto. <strong>Geminação</strong> significa duplicação da consoante na análise fonológica e gramatical. Esses termos descrevem coisas diferentes: uma mudança de realização e uma duplicação não são a mesma explicação.</p><details><summary>Todo ponto na escrita hebraica é Dagesh?</summary><p>Não. Você também encontrará pontos em outras posições, como os de Shin/Sin, e um ponto em הּ final chamado Mappiq. Localizar a marca e identificar a letra evita confundir sinais que parecem semelhantes.</p></details><details><summary>O que este módulo permite concluir?</summary><p>Esta é uma introdução à distinção entre os usos e ao reconhecimento visual. Ainda não é um conjunto completo de regras para classificar cada ocorrência bíblica. Não há áudio; as diferenças entre tradições de pronúncia precisam de revisão editorial e explicação mais aprofundada.</p></details>`,
    items: [
      ['בּ','Dagesh Qal','Observe o ponto dentro da letra. O uso Qal está associado às letras בגדכפת.','Marca a realização oclusiva tradicional; o exemplo introdutório é בּ com B.','Oclusiva descreve um som produzido com fechamento da passagem do ar. A aproximação B/V de בּ / ב é usada nesta apresentação, sem representar todas as tradições históricas.'],
      ['בּ','Dagesh Chazaq','O ponto pode ter o mesmo desenho que no exemplo de Qal.','Marca geminação: a consoante é duplicada na análise fonológica e gramatical.','Não significa simplesmente que a letra ganha outro som. Também não é possível classificar este בּ isolado como Qal ou Chazaq apenas olhando o ponto: aqui ele ilustra a marca gráfica.']
    ],
    comparison: `<h3>Sinais parecidos, funções diferentes</h3><p>Esta etapa é um mapa para não confundir as marcas. Abra uma explicação por vez; as regras completas de leitura ficam para lições específicas.</p><details open><summary>Shin e Sin: localize o ponto no alto</summary><div class="signs-comparison"><div><span lang="he" dir="rtl">שׁ</span><small>Shin · ponto à direita · SH</small></div><div><span lang="he" dir="rtl">שׂ</span><small>Sin · ponto à esquerda · S</small></div></div><p>A posição do ponto distingue essas duas leituras. Observe o alto da letra antes de responder. Esse ponto não é o Dagesh interior.</p></details><details><summary>Mappiq: o ponto em הּ final</summary><div class="hebrewline" lang="he" dir="rtl">הּ</div><p>O Mappiq indica ה consonantal no final da palavra. O ponto não deve ser automaticamente chamado de Dagesh: a identidade da letra e sua posição precisam ser consideradas.</p></details><details><summary>Meteg: uma marca vertical</summary><p>Meteg é uma pequena marca vertical associada a aspectos de acento e leitura. Não é um ponto interior. As condições de uso exigem estudo próprio; por enquanto, o objetivo é saber que se trata de outra marca.</p></details><details><summary>Sheva vocal e quiescente</summary><div class="hebrewline" lang="he" dir="rtl">בְ</div><p>O Sheva fica abaixo da letra. A distinção entre vocal e quiescente depende do contexto e não é identificada apenas pela forma dos dois pontos. Retome a introdução em Niqqud antes de tentar analisar ocorrências em palavras.</p></details>`
  }
};
// Reuse the existing “other signs” explanations as directly selectable topics.
signsCourses.dagesh.items.push(
  ['שׁ','Shin','O ponto fica no alto, à direita da letra.','Indicação introdutória: SH.','Esse ponto distingue Shin de Sin; não é o Dagesh interior.'],
  ['שׂ','Sin','O ponto fica no alto, à esquerda da letra.','Indicação introdutória: S.','Compare com Shin: a posição do ponto muda a leitura.'],
  ['הּ','Mappiq','Um ponto no interior de ה final.','Indica He consonantal no final da palavra.','A identidade da letra e sua posição precisam ser consideradas. Não chame automaticamente esse ponto de Dagesh.'],
  ['בֽ','Meteg','Uma pequena marca vertical associada à letra.','Associada a aspectos de acento e leitura.','Não é um ponto interior. As condições de uso exigem estudo próprio; este é um esquema gráfico, não uma palavra.'],
  ['בְ','Sheva','Dois pontos verticais abaixo da letra.','Pode ser vocal ou quiescente, conforme o contexto.','Vocal indica leitura com vogal; quiescente, sem vogal. Essa distinção não é identificada apenas pela forma. Retome a categoria de Sheva em Niqqud.']
);
const dageshGroups = [
  { name:'Dagesh', note:'O mesmo ponto, dois usos. A letra e o contexto fazem a diferença.', items:[0,1] },
  { name:'Pontos que distinguem letras', note:'Compare a posição do ponto no alto de Shin e Sin.', items:[2,3] },
  { name:'Outras marcas de leitura', note:'Reconheça cada marca sem confundir suas funções.', items:[4,5,6] }
];
// Existing indices remain stable so saved bookmarks still point to the same topic.
const niqqudGroups = [
  { name: 'Sinais básicos', items: [0,1,2,3,4,5,6], note: 'Comece pelo desenho e pela posição de cada sinal.' },
  { name: 'Sheva e vogais reduzidas', items: [8,9,10,11], note: 'Compare Sheva com os três Hataf, um de cada vez.' },
  { name: 'Vogais com letras', items: [7,13,14,15,16], note: 'Estas formas combinam sinais com Vav ou Yod.' },
  { name: 'Leitura contextual e edição', items: [12,17], note: 'Estude depois dos sinais básicos. A forma isolada não resolve a leitura.' }
];
function signGroup(course, index) {
  return course === 'niqqud' ? niqqudGroups.find(group => group.items.includes(index)) : null;
}
function signPicker(course) {
  const items = signsCourses[course].items;
  function tiles(indices) {
    return `<div class="signs-picker">${indices.map(i=>`<button class="lettertile" data-sign-index="${i}" aria-pressed="${signsState[course].item===i}" onclick="selectSign('${course}',${i})"><b lang="he" dir="rtl">${items[i][0]}</b><span>${items[i][1]}</span></button>`).join('')}</div>`;
  }
  return course === 'niqqud' ? niqqudGroups.map((group, i)=>`<details class="signs-group"><summary>${i+1}. ${group.name} · ${group.items.length} tópicos</summary><p>${group.note}</p>${tiles(group.items)}</details>`).join('') : tiles(items.map((_,i)=>i));
}
const signsState = { niqqud: { stage: 0, item: 0 }, dagesh: { stage: 0, item: 0 } };
let signsQuestion = null;

// Graphic demonstrations reuse the reviewed introductory signs; they are not words.
const niqqudLetters = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
const niqqudSounds = ['a','a','e','e','i','o','u','u','contextual','ă','ĕ','ŏ','o','o','i','e','e','o'];
const niqqudLengths = ['Breve','Longa','Breve','Longa','Breve','Longa','Breve','Longa','Depende do contexto','Reduzida','Reduzida','Reduzida','Breve','Longa','Longa','Longa','Longa','Longa'];
function niqqudCardSymbol(index) {
  // Draw the placeholder and marks separately: combining marks do not anchor
  // reliably to U+25CC in the bundled font. Text examples keep real Unicode.
  if ([7,13,14,15,16,17].includes(index)) return `<b lang="he" dir="rtl">${signsCourses.niqqud.items[index][0]}</b>`;
  const dot = (x,y) => `<circle cx="${x}" cy="${y}" r="1.8" fill="currentColor"/>`;
  const bar = '<path d="M34 54H46"/>';
  const qamats = '<path d="M34 54H46M40 54V59"/>';
  const segol = dot(36,53)+dot(44,53)+dot(40,59);
  const sheva = dot(55,53)+dot(55,64);
  const marks = {
    0:bar, 1:qamats, 2:segol, 3:dot(36,54)+dot(44,54),
    4:dot(40,54), 5:dot(29,11), 6:dot(36,52)+dot(40,57)+dot(44,62),
    8:dot(40,54)+dot(40,65),
    9:'<path d="M22 58H40"/>'+sheva,
    10:dot(24,54)+dot(38,54)+dot(31,65)+sheva,
    11:'<path d="M22 56H40M31 56V64"/>'+sheva,
    12:qamats
  };
  return `<svg class="niqqud-sign-diagram" viewBox="0 0 80 88" role="img" aria-label="${signsCourses.niqqud.items[index][1]}"><circle cx="40" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2.4 3.6"/><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">${marks[index]}</g></svg>`;
}
function niqqudSample(index, letter) {
  const marks = ['ַ','ָ','ֶ','ֵ','ִ','ֹ','ֻ',null,'ְ','ֲ','ֱ','ֳ','ָ'];
  if (index === 7) return letter + 'וּ';
  if (index === 13) return letter + 'וֹ';
  if ([14,15,16].includes(index)) return letter + ({14:'ִ',15:'ֵ',16:'ֶ'})[index] + 'י';
  if (index === 17) return 'וֺ';
  return letter + marks[index];
}
function renderNiqqud(target) {
  const data = signsCourses.niqqud, state = signsState.niqqud;
  target.innerHTML = `<div class="niqqud-overview">${readingReturnLink()}<section class="lesson alphabet-copy"><span class="eyebrow">SINAIS DE LEITURA</span><p class="niqqud-lead">Escolha um sinal para ver sua forma, sua leitura e como ele se combina com as letras.</p>
    ${niqqudGroups.map(group => `<section class="niqqud-category"><h3>${group.name}</h3><p>${group.note}</p><div class="niqqud-tiles">${group.items.map(i => `<button class="niqqud-tile" data-sign-index="${i}" aria-pressed="${state.item === i}" aria-controls="signDetail" onclick="selectSign('niqqud',${i},true)">${niqqudCardSymbol(i)}<span>${data.items[i][1]}</span><small>${niqqudSounds[i]} <span aria-hidden="true">·</span> ${niqqudLengths[i]}</small></button>`).join('')}</div></section>`).join('')}
    <p class="niqqud-key">O círculo pontilhado marca o lugar da letra. Longa e breve são classificações tradicionais, não uma duração fixa em todas as tradições de leitura. Vogais reduzidas são muito breves; Sheva depende do contexto. Combinações com Vav e Yod aparecem por inteiro.</p></section>
    <section id="signDetail" class="lesson alphabet-copy niqqud-detail" role="region" aria-label="Detalhes do sinal"></section>
    <section class="lesson alphabet-copy niqqud-resources"><details><summary>Primeiros passos e limites da pronúncia</summary>${data.opening}</details><details><summary>Comparações e leitura contextual</summary>${data.comparison}</details><details ${state.stage === 3 ? 'open' : ''}><summary>Praticar a categoria selecionada</summary><p>Treino introdutório sem áudio ou avaliação de domínio.</p><div id="signQuestion"></div><div class="choices" id="signChoices"></div><div id="signFeedback" role="status" aria-live="polite"></div><button class="btn secondary" id="nextSignQuestion" onclick="newSignQuestion('niqqud')" disabled>Próxima questão</button></details></section></div>`;
  selectSign('niqqud',state.item);
  newSignQuestion('niqqud',state.item);
}
function backToSignCards() {
  const selected = $('.niqqud-tile[aria-pressed="true"]');
  if (selected) { selected.focus(); if (selected.scrollIntoView) selected.scrollIntoView({block:'center'}); }
}
function signCardsBackButton() { return '<button class="btn secondary tiny signs-back" onclick="backToSignCards()">← Voltar aos sinais</button>'; }
function renderNiqqudDetail(index) {
  const item = signsCourses.niqqud.items[index];
  const letters = index === 17 ? ['ו'] : niqqudLetters;
  $('#signDetail').innerHTML = `${signCardsBackButton()}<div class="niqqud-detail-heading"><span class="niqqud-detail-symbol" lang="he" dir="rtl">${item[0]}</span><div><span class="eyebrow">${signGroup('niqqud',index).name}</span><h3 id="niqqudSelectedHeading" tabindex="-1">${item[1]}</h3><span class="niqqud-length">${niqqudLengths[index]} · classificação tradicional</span><p>${item[3]}</p></div></div><p>${item[2]}</p><h4>${index === 17 ? 'Uma marca específica para Vav' : 'Veja com as 22 letras'}</h4><p class="niqqud-example-note">${index === 17 ? 'Esta marca editorial pertence ao Vav consonantal. Não se aplica às outras letras.' : 'Demonstração gráfica, da direita para a esquerda: são combinações isoladas, não palavras nem regras de uso.'}${[9,10,11].includes(index) ? ' As vogais reduzidas aparecem sobretudo nas guturais א, ה, ח e ע; a grade não indica uso habitual nas demais letras.' : ''}${[7,13,14,15,16].includes(index) ? ' Observe a letra seguida da combinação vocálica; a letra de apoio não é um sinal aplicado dentro de cada consoante.' : ''}${index === 12 ? ' A leitura de Qamats Qatan depende da palavra, mesmo quando o desenho é igual ao de Qamats.' : ''}</p><div class="niqqud-examples">${letters.map((letter,i) => `<div><b lang="he" dir="rtl">${niqqudSample(index,letter)}</b><small>${index === 17 ? 'Vav' : ['Alef','Bet','Gimel','Dalet','He','Vav','Zayin','Chet','Tet','Yod','Kaf','Lamed','Mem','Nun','Samekh','Ayin','Pe','Tsadi','Qof','Resh','Shin','Tav'][i]}</small></div>`).join('')}</div><details><summary>Mais sobre este sinal</summary><p>${item[4]}</p></details>`;
  document.querySelectorAll('.niqqud-tile').forEach(button => button.setAttribute('aria-pressed',String(Number(button.getAttribute('data-sign-index')) === index)));
}

function dageshCardSymbol(index) {
  if ([2,3,4].includes(index)) return `<b lang="he" dir="rtl">${signsCourses.dagesh.items[index][0]}</b>`;
  const mark = index === 5 ? '<path d="M40 51V62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' : index === 6 ? '<circle cx="40" cy="53" r="1.8"/><circle cx="40" cy="61" r="1.8"/>' : '<circle cx="40" cy="30" r="1.8"/>';
  return `<svg class="niqqud-sign-diagram" viewBox="0 0 80 88" role="img" aria-label="${signsCourses.dagesh.items[index][1]}"><circle cx="40" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="2.4 3.6"/><g fill="currentColor">${mark}</g></svg>`;
}
function renderDagesh(target) {
  const data=signsCourses.dagesh, state=signsState.dagesh;
  target.innerHTML=`<div class="niqqud-overview dagesh-overview">${readingReturnLink()}<section class="lesson alphabet-copy"><span class="eyebrow">DAGESH E SINAIS</span><p class="niqqud-lead">Escolha uma marca para entender onde ela aparece e o que indica.</p>${dageshGroups.map(group=>`<section class="niqqud-category"><h3>${group.name}</h3><p>${group.note}</p><div class="niqqud-tiles">${group.items.map(i=>`<button class="niqqud-tile" data-sign-index="${i}" aria-pressed="${state.item===i}" aria-controls="signDetail" onclick="selectSign('dagesh',${i},true)">${dageshCardSymbol(i)}<span>${data.items[i][1]}</span><small>${['Realização da consoante','Duplicação da consoante','SH · ponto à direita','S · ponto à esquerda','He final consonantal','Marca vertical','Leitura contextual'][i]}</small></button>`).join('')}</div></section>`).join('')}<p class="niqqud-key">O círculo pontilhado marca o lugar da letra. Dagesh Qal e Chazaq têm o mesmo desenho; o ponto isolado não permite distingui-los.</p></section><section id="signDetail" class="lesson alphabet-copy" role="region" aria-label="Detalhes da marca"></section><section class="lesson alphabet-copy"><details><summary>O básico antes das regras</summary>${data.opening}</details><details ${state.stage===3?'open':''}><summary>Praticar os conceitos</summary><p>Responda pela descrição. Este treino não classifica pontos isolados nem comprova domínio.</p><div id="signQuestion"></div><div class="choices" id="signChoices"></div><div id="signFeedback" role="status" aria-live="polite"></div><button class="btn secondary" id="nextSignQuestion" onclick="newSignQuestion('dagesh')" disabled>Próxima questão</button></details></section></div>`;
  selectSign('dagesh',state.item);
}
function dageshAlphabet(index) {
  const qal = 'בגדכפת', excluded = 'אהחער';
  return `<h4>O ponto nas letras · ${index === 0 ? 'Qal' : 'Chazaq'}</h4><p class="niqqud-example-note">${index === 0 ? 'Qal se aplica às seis letras בגדכפת. As outras ficam sem ponto nesta grade.' : 'Nesta regra introdutória, Chazaq pode ocorrer nas consoantes, exceto nas guturais א ה ח ע e em ר. A grade mostra a posição gráfica, sem classificar ocorrências reais.'}</p><div class="niqqud-examples dagesh-alphabet">${niqqudLetters.map((letter,i)=>{
    const active=index===0?qal.includes(letter):!excluded.includes(letter);
    return `<div class="${active?'dagesh-applicable':'dagesh-inactive'}"><b lang="he" dir="rtl">${letter}${active?'ּ':''}</b><small>${['Alef','Bet','Gimel','Dalet','He','Vav','Zayin','Chet','Tet','Yod','Kaf','Lamed','Mem','Nun','Samekh','Ayin','Pe','Tsadi','Qof','Resh','Shin','Tav'][i]}</small><small>${active?'Com ponto':'Sem aplicação aqui'}</small></div>`;
  }).join('')}</div>${index===1?'<p class="niqqud-example-note">Em Vav, o esquema וּ representa aqui uma consoante com Dagesh. O mesmo desenho pode representar Shuruq (vogal u) em outro contexto. Não decida só pela aparência.</p>':''}`;
}
function dageshComparisonTable() {
  return `<h4>O que muda?</h4><div class="dagesh-table-wrap"><table class="dagesh-table"><caption>Qal e Chazaq · regra introdutória</caption><thead><tr><th scope="col">Aspecto</th><th scope="col">Qal (lene)</th><th scope="col">Chazaq (forte)</th></tr></thead><tbody><tr><th scope="row">Onde aparece</th><td>Nas seis letras בגדכפת.</td><td>Em regra, nas consoantes além de א ה ח ע ר.</td></tr><tr><th scope="row">O que indica</th><td>Realização oclusiva: som produzido com fechamento da passagem do ar.</td><td>Geminação: duplicação da consoante na análise gramatical.</td></tr><tr><th scope="row">Exemplo didático</th><td>בּ → b simples.</td><td>בּ → bb; מּ → mm. São indicações de duplicação, não palavras.</td></tr><tr><th scope="row">Nas letras בגדכפת</th><td>Marca a realização oclusiva, sem duplicar.</td><td>Combina a realização oclusiva com a duplicação.</td></tr><tr><th scope="row">Como distinguir</th><td colspan="2">O ponto tem o mesmo desenho. É preciso analisar a letra e o contexto da palavra.</td></tr></tbody></table></div><details><summary>Os sons nas seis letras de Qal</summary><p>Convenção tradicional apresentada no guia BBH2. As aproximações não descrevem todas as tradições de leitura; não há áudio. “Fricativo” indica passagem de ar com atrito; “oclusivo”, fechamento da passagem.</p><div class="dagesh-table-wrap"><table class="dagesh-table"><thead><tr><th scope="col">Letra</th><th scope="col">Sem ponto · fricativo</th><th scope="col">Com Qal · oclusivo</th></tr></thead><tbody>${[['ב','בּ','Bet','v','b'],['ג','גּ','Gimel','gh (fricativo)','g'],['ד','דּ','Dalet','th sonoro (como em inglês “the”)','d'],['כ','כּ','Kaf','kh','k'],['פ','פּ','Pe','f','p'],['ת','תּ','Tav','th surdo (como em inglês “thin”)','t']].map(([plain,marked,name,soft,hard])=>`<tr><th scope="row">${name}</th><td><span lang="he" dir="rtl">${plain}</span> · ${soft}</td><td><span lang="he" dir="rtl">${marked}</span> · ${hard}</td></tr>`).join('')}</tbody></table></div></details>`;
}
function renderDageshDetail(index) {
  const item=signsCourses.dagesh.items[index];
  const group=dageshGroups.find(group=>group.items.includes(index));
  const comparison=index<2 ? [['ב','Sem ponto interior'],['בּ','Com ponto interior']] : [2,3].includes(index) ? [['שׁ','Shin · SH · direita'],['שׂ','Sin · S · esquerda']] : [[item[0],item[1]]];
  $('#signDetail').innerHTML=`${signCardsBackButton()}<div class="niqqud-detail-heading"><span class="niqqud-detail-symbol" lang="he" dir="rtl">${item[0]}</span><div><span class="eyebrow">${group.name}</span><h3 id="dageshSelectedHeading" tabindex="-1">${item[1]}</h3><p>${item[3]}</p></div></div><p>${item[2]}</p><div class="signs-comparison">${comparison.map(([glyph,label])=>`<div><span lang="he" dir="rtl">${glyph}</span><small>${label}</small></div>`).join('')}</div><p>${item[4]}</p>${index<2?dageshAlphabet(index)+dageshComparisonTable():''}${index===6?'<button class="btn secondary" onclick="openShevaLesson()">Explorar Sheva em Niqqud</button>':''}`;
  document.querySelectorAll('.dagesh-overview .niqqud-tile').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.getAttribute('data-sign-index'))===index)));
}

function openShevaLesson() {
  signsState.niqqud.item=8;
  setPage('niqqud');
  $('#niqqudSelectedHeading').focus();
}
function readingReturnLink() {
  return typeof readingConsultation !== 'undefined' && readingConsultation ? `<button class="btn secondary reading-return" onclick="setPage('reading')">← Voltar ao trecho de leitura</button>` : '';
}
function renderSignsCourse(course, target = $('#content')) {
  const data = signsCourses[course], state = signsState[course];
  if (!data || !state) return;
  if (course === 'niqqud') { renderNiqqud(target); return; }
  renderDagesh(target);
}

function setSignsStage(course, stage) {
  if (!signsState[course] || !Number.isInteger(stage) || stage < 0 || stage > 3) return;
  signsState[course].stage = stage;
  if (typeof rememberStudy === 'function') rememberStudy();
  renderSignsCourse(course);
  const heading = $('#signsPanel h3');
  if (heading) { heading.tabIndex = -1; heading.focus(); }
}

function selectSign(course, index, focusDetail = false) {
  const data = signsCourses[course];
  if (!data || !Number.isInteger(index) || !data.items[index]) return;
  signsState[course].item = index;
  if (typeof rememberStudy === 'function') rememberStudy();
  if (course === 'niqqud') {
    renderNiqqudDetail(index);
    if (focusDetail) $('#niqqudSelectedHeading').focus();
    newSignQuestion('niqqud',index);
    return;
  }
  renderDageshDetail(index);
  if (focusDetail) $('#dageshSelectedHeading').focus();
  newSignQuestion('dagesh',index);
}

function newSignQuestion(course, index) {
  const data = signsCourses[course];
  if (!data) return;
  const requested = Number.isInteger(index) && data.items[index] ? index : null;
  const anchor = requested ?? (signsQuestion?.course === course ? signsQuestion.selected : signsState[course].item);
  const group = signGroup(course, anchor);
  const pool = group ? group.items : data.items.map((_,i)=>i);
  const selected = requested ?? pool[Math.floor(Math.random()*pool.length)];
  let options = pool.map(i => ({ label: data.items[i][1], index: i }));
  for (let i = options.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]; }
  options = [options.find(item => item.index === selected), ...options.filter(item => item.index !== selected).slice(0, 3)];
  const position = Math.floor(Math.random() * options.length);
  [options[0], options[position]] = [options[position], options[0]];
  const prompts = {
    12: 'Qual tópico trata da leitura o de Qamats nesta convenção didática? O desenho isolado não resolve essa classificação.',
    17: 'Qual tópico descreve Vav como consoante acompanhada de Holam, em vez de uma letra vocálica?'
  };
  const conceptual = course === 'dagesh' || Boolean(prompts[selected]);
  signsQuestion = { course, selected, options, answered: false, kind: conceptual ? 'concept' : 'visual' };
  const scope = group ? `<p class="muted">Grupo: ${group.name}</p>` : '';
  $('#signQuestion').innerHTML = scope + (conceptual ? `<p class="signs-prompt">${course === 'niqqud' ? prompts[selected] : data.items[selected][3]}</p>` : `<div class="alphabet-symbol" lang="he" dir="rtl">${data.items[selected][0]}</div>`);
  $('#signChoices').innerHTML = options.map((option, i) => `<button class="choice" onclick="answerSign(${i})">${option.label}</button>`).join('');
  $('#signFeedback').textContent = '';
  $('#nextSignQuestion').disabled = true;
}

function answerSign(index) {
  const q = signsQuestion;
  if (!q || q.answered || !Number.isInteger(index) || !q.options[index]) return;
  q.answered = true;
  const item = signsCourses[q.course].items[q.selected];
  $('#signFeedback').textContent = `${q.options[index].index === q.selected ? 'Correto!' : 'Vamos rever.'} ${item[1]}. ${item[2]} ${item[3]}`;
  document.querySelectorAll('#signChoices button').forEach((button, i) => { button.disabled = true; if (q.options[i].index === q.selected) button.classList.add('alphabet-correct'); });
  $('#nextSignQuestion').disabled = false;
}
