# Hebrew Immersion — especificação do produto

## Visão do produto
Construir um aplicativo **desktop instalável no Fedora Workstation 44**, preferencialmente distribuído via **Flatpak**, dedicado ao aprendizado de **hebraico bíblico** do zero até a leitura contextual das Escrituras. O público inicial é um estudante brasileiro que já está aprendendo a transliterar as letras, mas ainda possui pouco vocabulário e quer deixar de traduzir mentalmente cada palavra.

O objetivo NÃO é apenas um catálogo de flashcards. O aplicativo deve ensinar a **reconhecer, ler e compreender** hebraico bíblico por associação visual, contexto, áudio e prática gradual. O hebraico moderno deve ser diferenciado e sinalizado quando aparecer; não misturar suas regras com as do hebraico bíblico sem explicação.

## Preferências inegociáveis do usuário
- Interface gráfica completa e intuitiva; usuário prefere **não depender de comandos de terminal** para usar o aplicativo instalado.
- Design limpo, minimalista, moderno, de alto contraste; a interface usa tema escuro com cinzas neutros, superfícies planas e estados de seleção de alto contraste (preferência atualizada em 2026-11-10).
- **Texto hebraico com Niqqud e transliteração visíveis juntos** no modo básico de vocabulário. A transliteração pode se tornar opcional em exercícios avançados.
- **Português oculto por padrão.** O botão **“Tenho dúvida”** deve revelar *somente o significado/explicação em português*. Não esconder transliteração atrás desse botão.
- Associação direta entre **imagem + palavra hebraica** antes da tradução; imagens devem ajudar semanticamente, não ser meramente decorativas.
- Ao clicar **“Já conheço”**, fornecer feedback visível/animado, mudar o estado do cartão para “Conhecida ✓”, persistir o progresso. Marcar como conhecida não deve, por si só, ser confundido com comprovação de domínio.
- Progressão didática: conceitos pré-requisitos vêm antes de conteúdos dependentes; evitar introduzir terminologia não ensinada sem explicá-la.
- Na área de alfabeto, ensinar **forma, som, nome e variantes** da letra, com exercícios de reconhecimento de som e forma; o usuário ainda depende dos nomes das letras.
- Possibilidade futura de estudar sem Niqqud, mas introduzindo isso apenas gradualmente; não remover Niqqud cedo demais.
- App **híbrido**: todo o curso essencial, imagens, aulas, progresso e exercícios básicos funcionam **offline**. IA online é **opcional** e jamais condição para estudar.
- O conteúdo deve priorizar rigor linguístico; não inventar traduções, etimologias, regras, áudios ou exemplos bíblicos. Distinguir tradições de pronúncia quando relevante.

## Escopo desejado
1. Biblioteca de **2.000 palavras**, agrupadas por temas e frequência, com ortografia hebraica, Niqqud, transliteração consistente, significado ocultável, categoria gramatical, exemplos revisados e ilustração adequada (para verbos/conceitos abstratos, situações/contexto em vez de fotos aleatórias).
2. Curso de **alfabeto**: 22 letras, cinco formas finais, letras semelhantes, formas com e sem dagesh, Shin/Sin, identificação e leitura.
3. Curso de **Niqqud**: sinais vocálicos, sheva, shuruq, distinções condicionadas pela tradição e exemplos de leitura.
4. Curso de **Dagesh**: Qal, Chazaq, בג״ד כפ״ת, geminação, Mappiq, Meteg, distinção Shin/Sin e fenômenos associados; exemplos graduais.
5. Curso de **gramática e morfologia**: substantivos, gênero/número, dual, artigo הַ, pronomes, preposições, adjetivos, raízes, padrões, sete binyanim, sistema verbal, sintaxe e análise de formas bíblicas.
6. **Exercícios variados**: imagem→palavra, palavra→imagem, reconhecimento auditivo, completar frases, leitura com/sem Niqqud, contextualização em frases e, adiante, passagens bíblicas.
7. **Revisão espaçada** personalizada e estatísticas compreensíveis (palavras vistas/conhecidas/dominadas, fila de revisão, acertos); progresso armazenado localmente e recuperação/exportação futura.
8. **Laboratório de leitura bíblica** com texto original, análise lexical/morfológica e ajuda em português sob demanda.
9. **Áudio** de pronúncia para palavras e exemplos, com atenção especial à tradição escolhida; offline quando arquivos locais estiverem disponíveis.
10. **Professor com IA**, opcional: explicações em português sobre dúvidas de hebraico bíblico, geração auxiliar de práticas, sem misturar moderno/bíblico sem aviso; requer internet e deve expor claramente possíveis custos do provedor.
11. Empacotamento **Flatpak** validado em Fedora e testes da interface real.

## Arquitetura e dados
Manter Electron; migrações significativas exigem justificativa, plano e aprovação. `main.js` controla janela, permissões e IPC/HTTPS; `preload.js` expõe a ponte; `src/index.html` e `style.css` compõem a interface. `app.js` reúne navegação, conteúdo e exercícios; `hybrid.js` acrescenta revisão e IA substituindo funções globais. Evoluir incrementalmente para separar UI, domínio, conteúdo, persistência e serviços.

O curso essencial usa arquivos locais, sem login ou rede: vocabulário, ilustrações, aulas, exercícios, revisão, progresso e textos bíblicos distribuídos. IA, pronúncia remota e atualizações são opcionais. Identificar destino, dados enviados e custos antes de cada uso online; nunca persistir credenciais nem transmitir histórico/progresso sem autorização específica.

Formato atual de palavra: `id`, `hebrew`, `translit`, `pt`, `category` (tema), `visual` (chave de emoji), `example_pt`, `example_he`, `level`. O modelo futuro deve incluir forma sem Niqqud, classe gramatical, contexto, imagem/áudio locais, procedência, licença, tradição de pronúncia e estado de revisão editorial. Preservar IDs e definir normalização Unicode sem apagar distinções consonantais.

Persistência atual: `learned` contém IDs familiares; `hi.srs.v1` indexa registros com `repetitions`, `interval`, `ease`, `due`, `attempts`, `correct`. Evoluir para schema versionado/validado, recuperação de corrupção, migração e exportação/importação local. Domínio exige evidência de revisões, não clique isolado.

## UX e desenvolvimento de longo prazo
Interface gráfica sem terminal no aplicativo instalado, teclado, foco visível, feedback acessível, RTL, sinais combinantes legíveis e movimento reduzido. Ensinar nomes junto com forma, som e variantes, reduzindo dependência deles no reconhecimento. Leitura sem Niqqud somente em etapas graduais.

O roteiro priorizado com critérios testáveis está em [PROGRESS.md](PROGRESS.md). A meta de 2.000 palavras só deve crescer por lotes revisados e licenciados. Build Linux em diretório não equivale a Flatpak; distribuição exige runtime, launcher, recursos e metadados completos, com instalação e estudo offline testados no Fedora 44.

## Atualização de UX — novembro de 2026
A tela inicial prioriza continuar estudo e revisões. `src/study.js` reúne apresentação da home, vocabulário paginado (seis por grupo de estudo ou doze na biblioteca), filtros e bookmark local validado em `hi.study.v1`. `src/progress.js` concentra leitura/gravação validada. Bookmarks registram posição, sem comprovar conclusão ou domínio.

UI em cinzas neutros; explicações e transliteração maiores, detalhes expansíveis e seleção completa recolhida. Fonte hebraica local em `src/assets/fonts`, com licença e procedência. Vocabulário familiar usa “Conhecida ✓”, contado sobre o acervo disponível; não há indicador artificial de conclusão da meta de 2.000 palavras. Termos e progressão pedagógica permanecem sujeitos à revisão indicada nas lições.

## Plano de estudos e leitura de longo prazo
A aba **Plano de estudos** organiza uma proposta ajustável em 24 blocos mensais de quatro semanas, com rotina diária, pausas, critérios de avanço por compreensão e atalhos ao conteúdo realmente disponível. O plano distingue apoio introdutório, exemplo isolado e aulas ainda não implementadas. Marcações representam atividades realizadas, não domínio ou conclusão automática de conteúdo.

`src/roadmap-data.js` contém temas, fases e lista de livros; `src/roadmap.js` monta a agenda e usa `hi.roadmap.v1` para posição, preferências, atividades e leitura dos livros. Esse estado é local e separado de `learned`, `hi.srs.v1` e `hi.study.v1`. Os blocos preparam para leitura acompanhada da Bíblia hebraica, sem prazo garantido. O registro de livros permanece aberto após os blocos; não distribui o texto integral nem cobre outras línguas bíblicas.
