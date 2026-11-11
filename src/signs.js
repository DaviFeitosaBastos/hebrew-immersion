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

function renderSignsCourse(course, target = $('#content')) {
  const data = signsCourses[course], state = signsState[course];
  if (!data || !state) return;
  target.innerHTML = `<div class="alphabet-course signs-course"><nav class="alphabet-steps" aria-label="Etapas de ${course === 'niqqud' ? 'Niqqud' : 'Dagesh'}">${data.stages.map((name, i) => `<button class="btn secondary" ${state.stage === i ? 'aria-current="step"' : ''} onclick="setSignsStage('${course}',${i})">${i + 1}. ${name}</button>`).join('')}</nav><section class="lesson alphabet-copy" id="signsPanel"></section></div>`;
  const panel = $('#signsPanel');
  if (state.stage === 0) panel.innerHTML = data.opening;
  if (state.stage === 1) {
    panel.innerHTML = `<h3>${course === 'niqqud' ? 'Explore um tópico por vez' : 'Dois usos, uma marca gráfica'}</h3><p>${course === 'niqqud' ? 'Os sinais estão organizados em quatro grupos. Os exemplos isolados são esquemas visuais, não palavras.' : 'Leia as duas explicações. Os exemplos isolados ilustram o ponto; não são ocorrências bíblicas classificadas.'}</p><div id="signDetail"></div><details id="signPicker"><summary>Escolher outro tópico</summary>${signPicker(course)}</details>`;
    selectSign(course, state.item);
  }
  if (state.stage === 2) panel.innerHTML = data.comparison;
  if (course === 'niqqud' && state.stage === 2) panel.innerHTML += '<details><summary>Referências e limites desta ampliação</summary><p>Os tópicos acrescentados foram conferidos com o guia e suplemento BBH2 de John Beckman (capítulos 2 e 3) e com a especificação Unicode para hebraico. As explicações são sínteses próprias; os exemplos são esquemas, não citações bíblicas.</p><p>A pronúncia é apresentada por aproximações didáticas. Não há áudio ou revisão independente de todo o curso. A documentação do projeto registra as referências completas.</p></details>';
  if (state.stage === 3) {
    panel.innerHTML = `<h3>${course === 'niqqud' ? 'Pratique o grupo que você estudou' : 'Confira a diferença entre os usos'}</h3><p>${course === 'niqqud' ? 'A primeira questão usa o tópico selecionado. As seguintes ficam no mesmo grupo. Para mudar de grupo, volte a Explore os sinais.' : 'Responda pelo que a explicação descreve. O ponto isolado não basta para classificar Qal ou Chazaq.'}</p><p class="muted">Treino introdutório sem áudio ou avaliação de domínio.</p><div id="signQuestion"></div><div class="choices" id="signChoices"></div><div id="signFeedback" role="status" aria-live="polite"></div><button class="btn secondary" id="nextSignQuestion" onclick="newSignQuestion('${course}')" disabled>Próxima questão</button>`;
    newSignQuestion(course, state.item);
  } else panel.innerHTML += `<div class="alphabet-letter-actions"><button class="btn" onclick="setSignsStage('${course}',${state.stage + 1})">${state.stage === 2 ? 'Praticar' : 'Continuar'} →</button></div>`;
}

function setSignsStage(course, stage) {
  if (!signsState[course] || !Number.isInteger(stage) || stage < 0 || stage > 3) return;
  signsState[course].stage = stage;
  if (typeof rememberStudy === 'function') rememberStudy();
  renderSignsCourse(course);
  const heading = $('#signsPanel h3');
  if (heading) { heading.tabIndex = -1; heading.focus(); }
}

function selectSign(course, index) {
  const data = signsCourses[course];
  if (!data || !Number.isInteger(index) || !data.items[index]) return;
  signsState[course].item = index;
  if (typeof rememberStudy === 'function') rememberStudy();
  const picker = $('#signPicker'); if (picker) picker.open = false;
  const item = data.items[index], group = signGroup(course,index);
  const order = course === 'niqqud' ? niqqudGroups.flatMap(group=>group.items) : data.items.map((_,i)=>i);
  const position = order.indexOf(index), previous = order[position-1], next = order[position+1];
  const label = group ? `${group.name} · ${group.items.indexOf(index)+1} de ${group.items.length}` : `${index+1} de ${data.items.length}`;
  $('#signDetail').innerHTML = `<article class="alphabet-letter"><div class="alphabet-letter-heading"><span class="alphabet-symbol" lang="he" dir="rtl">${item[0]}</span><div><span class="eyebrow">${label}</span><h3>${item[1]}</h3><p>${item[2]}</p></div></div><h4>O que isso indica?</h4><p>${item[3]}</p><details><summary>Entenda o cuidado necessário</summary><p>${item[4]}</p></details><div class="alphabet-letter-actions"><button class="btn secondary" onclick="selectSign('${course}',${previous ?? -1})" ${position === 0 ? 'disabled' : ''}>← Anterior</button><button class="btn secondary" onclick="selectSign('${course}',${next ?? -1})" ${position === order.length - 1 ? 'disabled' : ''}>Seguinte →</button><button class="btn" onclick="setSignsStage('${course}',3)">Praticar</button></div></article>`;
  document.querySelectorAll('.signs-picker .lettertile').forEach(button => button.setAttribute('aria-pressed', String(Number(button.getAttribute('data-sign-index')) === index)));
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
