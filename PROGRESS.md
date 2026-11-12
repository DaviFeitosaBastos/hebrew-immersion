# Hebrew Immersion — estado e roteiro

Auditoria inicial: 2026-11-10. Versão 0.3.0, protótipo. A primeira etapa alterou apenas documentação e .gitignore; atualização do alfabeto descrita abaixo.

## Ambiente e segurança
Raiz: pasta do projeto (caminho específico da máquina omitido). Fedora Workstation 44 confirmado; Node 22.23.1, npm 10.9.8, RTK 0.44.2; flatpak e flatpak-builder disponíveis. Electron 31.7.7 e electron-builder 24.13.3 no lock.

A sessão declara sandbox `workspace-write`, escrita no projeto e `/tmp`, rede restrita e mecanismo de aprovação por solicitação. Não alterei configurações nem tentei escapes ou rede. Essas políticas são impostas pelo cliente, não pelos arquivos do projeto: conferir `workspace-write`, `on-request` e rede restrita nas configurações da próxima sessão; não presumir que este documento as habilita. O escopo deste trabalho permaneceu no projeto, além da leitura autorizada de RTK.md e da identificação do sistema.

Git não está inicializado; aguardar aprovação para `git init`. Nenhum commit feito. Recomendar backup antes de mudanças significativas. Não houve consulta externa de vulnerabilidades/suporte das dependências; essa avaliação permanece pendente, com autorização de rede.

## Implementado no código
Navegação; 30 entradas demonstrativas com emojis, Niqqud, transliteração e glossário; estado familiar e animação; exercício imagem→palavra; tabela de 22 letras com treino simples; introduções a Niqqud/Dagesh; roteiro de gramática; exemplo de Gênesis 1:1; revisão autoavaliada; formulário de IA e IPC/HTTPS com consentimento na UI. Nenhum desses módulos equivale ao curso completo.

## Verificado e limites
- Sintaxe dos quatro arquivos JS passou em `node --check`.
- JSON válido, 30 entradas e 30 IDs distintos; campos registrados em PROJECT.md. Sem validação linguística.
- Inspeção estática: recursos do curso locais; renderizador com isolamento, sandbox e Node desativado; bloqueio de novas janelas e pedidos de permissão.
- Sondagens Node/VM com DOM simulado confirmaram: JSON inválido em `learned` lança erro; SRS aceita array em vez de objeto validado; observação de leitura antecipa tradução. Duas sondagens preliminares tinham hipóteses incorretas sobre o SRS e foram corrigidas; não são evidência de outros defeitos.
- Não há scripts de teste/lint nem suíte automatizada. Sondagens desta auditoria foram transitórias, não uma suíte de regressão.
- Sem teste da GUI, build, API, áudio, instalação Flatpak ou sessão completa offline. Artefatos preexistentes não comprovam funcionamento.

## Defeitos e lacunas
1. Persistência: `getLearned()` não trata JSON inválido ou schema incorreto; `getSrs()` não valida estrutura. Escritas localStorage não tratam falhas. Risco de interrupção e cálculos inválidos.
2. Imersão: `verseInfo()` já inclui traduções antes do botão de revelação. `reveal()` repete transliteração, embora devesse revelar somente significado/explicação em português.
3. Exercícios: distratores fixos M/S/T geram alternativas duplicadas para essas letras; treino sem bloqueio de resposta ou progressão persistida. O alfabeto não é um curso completo.
4. Revisão: `gradeReview()` não valida qualidade/estado; autoavaliação não comprova domínio. “Adicionar palavras” considera sempre as dez primeiras. Acerto no exercício chama `mark()`, misturando reconhecimento com familiaridade declarada.
5. UX: progresso geral divide por 2.000 apesar de só 30 entradas; modo de estudo apenas muda estado/rótulo. Marcar palavra substitui explicação revelada por mensagem de estado.
6. Segurança: sem CSP; handlers inline e interpolação HTML sem escape uniforme, frágeis para futuras importações. IPC aceita qualquer `file://`, sem validar arquivo/frame exatos; consentimento só na UI e sem limite de concorrência. Requer revisão antes de ampliar a integração.
7. IA: navegar durante consulta remove campos que `finally` tenta acessar; pode lançar erro ou atingir formulário de outra consulta. Identificado estaticamente; sem chamada externa.
8. Flatpak: ambos os YAMLs são rascunhos equivalentes. Faltam Electron, launcher declarado, preload, hybrid e ícone; não concedem rede para IA. Não são instaladores funcionais.
9. Conteúdo: sem áudio, imagens finais, procedência/licenças e revisão editorial comprovada. Gramática é roteiro; leitura e demais módulos introdutórios. Fonte Heebo referenciada mas não distribuída. Faltam validação de teclado/contraste/RTL, idioma dos trechos e feedback acessível/movimento reduzido.
10. Arquitetura: UI, domínio, conteúdo e persistência acoplados; hybrid substitui globais e mantém ramo antigo de revisão. Carregamento não valida schema/resposta nem trata acervo vazio nos exercícios.

## Marcos priorizados e aceitação
| Ordem | Marco | Aceitação verificável |
|---|---|---|
| 1 | Testes e progresso confiável | Testes locais sem dependências novas para dados válidos/corrompidos, erros de escrita, relógio e intervalos SRS; recuperação sem perda silenciosa; familiaridade separada de revisão; reinício no Electron. |
| 2 | Segurança e imersão | Tradução só sob demanda; IPC valida arquivo/frame e entradas; navegação durante IA sem falha; reduzir HTML inseguro e aplicar CSP compatível; testes sem API paga. |
| 3 | Alfabeto completo | 22 letras e cinco finais, Shin/Sin, variantes e tradição explícita; lições graduais, alternativas únicas, feedback e progresso; fontes revisadas; teste offline/teclado. Áudio só quando disponível e validado. |
| 4 | Vocabulário confiável | Schema e primeiro lote revisados, fontes/licenças, imagens semânticas locais; exercícios nos dois sentidos e métricas honestas; crescer só após revisão. |
| 5 | Niqqud e Dagesh | Lições e exercícios graduais com pré-requisitos, sinais e fontes revisados; testes Unicode/RTL e reconhecimento. |
| 6 | Revisão e portabilidade | Critério de domínio, fila de todo o acervo, estatísticas e exportação/importação validadas; testes de tempo, migração, recuperação e reinício offline. |
| 7 | Gramática e leitura | Unidades de morfologia/sintaxe e passagens licenciadas, análises revisadas, exercícios contextuais e português sob demanda; avaliar cada unidade. |
| 8 | Distribuição Fedora | Dependências avaliadas, Flatpak completo e permissões mínimas justificadas; instalar, abrir, estudar offline, reiniciar e desinstalar no Fedora 44; IA validada separadamente com autorização. |

## Marco atual e próximo trabalho
Configuração documental e auditoria inicial concluídas nos limites acima. Próximo marco recomendado: **1 — testes e progresso confiável**, com mudanças pequenas de persistência/domínio. Depois corrigir segurança/imersão antes de ampliar alfabeto.

Decisões: manter Electron; offline primeiro; não ampliar artificialmente o acervo; não inicializar Git sem autorização; não apresentar build em diretório ou os YAMLs atuais como Flatpak pronto. Não foi iniciada implementação de funcionalidades.

## Atualização — organização do alfabeto (2026-11-10)
A pedido do usuário, a seção foi organizada em quatro etapas: primeiros passos, exploração de letras, cinco formas finais e prática. Explicações de leitura, forma/nome/som e sinais usam detalhes expansíveis para limitar a carga visual. Há observações visuais para as 22 letras, navegação anterior/seguinte e seleção destacada. O treino começa pela letra selecionada, gera quatro alternativas distintas, bloqueia respostas repetidas e apresenta feedback. A apresentação foi isolada em `src/alphabet.js`, sem migração de framework.

Verificação: `node --check` em app.js/alphabet.js; `node --test tests/alphabet.test.cjs` aprovado, cobrindo quatro etapas, detalhes das 22 letras, alternativas únicas, seleção inicial e estado de resposta. Testes usam DOM simulado; layout, teclado e renderização no Electron ainda precisam de validação visual. Recursos são locais, sem novas dependências ou chamadas externas.

Não é o curso completo: sem áudio, progressão persistida ou validação editorial da tradição de pronúncia. A UI explica esses limites. Os defeitos anteriores de alternativas duplicadas e resposta repetida no treino de letras foram corrigidos; os demais itens da auditoria permanecem pendentes. O alfabeto não altera familiaridade ou domínio do vocabulário. Próximo passo local: testar a interface real e revisar o conteúdo; o marco geral de persistência continua pendente.

## Atualização — Niqqud e Dagesh organizados (2026-11-10)
A apresentação foi reorganizada em `src/signs.js`, integrado à navegação existente. Cada módulo tem quatro etapas, explicações de termos antes do uso, exemplos isolados, seleção de um tópico por vez e detalhes expansíveis. Niqqud apresenta nove sinais e comparações visuais; Shuruq aparece como וּ, corrigindo a composição anterior com Bet. Dagesh separa os conceitos Qal/Chazaq e apresenta Shin/Sin, Mappiq, Meteg e Sheva em blocos próprios. Não se tenta classificar Qal/Chazaq pelo ponto isolado.

Exercícios locais: nomes dos sinais em Niqqud e identificação conceitual em Dagesh; alternativas únicas, resposta única, feedback e liberação da próxima questão. A seleção e a etapa de cada módulo ficam apenas na memória da sessão. Não há áudio, progresso persistido ou certificação de domínio.

Verificado: sintaxe de app.js/signs.js e testes de alfabeto/sinais (`node --test tests/alphabet.test.cjs tests/signs.test.cjs`) aprovados. Os testes cobrem etapas, seleção, alternativas, bloqueio de resposta e estados independentes com DOM simulado. Sem validação visual no Electron ou nova revisão linguística externa: reorganização baseada no conteúdo introdutório existente, com explicações editoriais e limites explícitos. Não equivale ao marco de curso completo de Niqqud/Dagesh. Recursos continuam locais e não foram adicionadas dependências.

## Atualização — identidade visual neutra (2026-11-10)
A pedido do usuário, o tema passou a usar cinzas neutros: grafite nos fundos, superfícies planas, texto claro e botões cinza. A variável de destaque foi renomeada para `--accent`; gradientes verdes/roxos foram removidos, cantos reduzidos e estados selecionados/aprendidos preservados com bordas e texto. Ícones decorativos da navegação foram substituídos por SVGs locais de traço consistente; textos promocionais simplificados. Emojis semânticos do vocabulário permanecem como recursos provisórios. Fundo da janela Electron alinhado ao tema; sem serviços, dependências ou mudanças de arquitetura.

Verificado: todos os hexadecimais do CSS são neutros; sem gradientes; seis pares principais de texto/fundo têm contraste calculado acima de 4,5:1 (menor par medido: 5,75:1). Sintaxe dos JS alterados e testes de alfabeto/sinais aprovados. Esses cálculos não equivalem a auditoria completa de acessibilidade ou validação visual; GUI ainda não foi inspecionada nesta entrega.

## Correções — revisão e bordas do vocabulário (2026-11-10)
Problemas tratados: lote de revisão preso nas primeiras dez palavras; fila limitada a 12 cartões; avaliação sem validar sessão/qualidade; cliques atrasados capazes de avaliar outra palavra; conclusão com contadores desatualizados; JSON/schema inválido e gravações sem tratamento. Persistência validada em `src/progress.js`, carregado antes da UI, preserva originais danificados em chaves locais `.recovery.<timestamp>` antes de substituí-los e apresenta avisos quando a leitura/gravação falha. Registros SRS danificados voltam ao estado inicial; registros válidos são preservados. Não acessa nem exporta o perfil do usuário.

A fila mostra todo o acervo acompanhado, por vencimento, com data e hora, estados vazios e botão de atualização. Adição em lotes de até dez considera somente palavras ainda ausentes. Avaliações usam token por cartão, validação de entrada e confirmação de gravação antes de avançar. Reconhecimento pode ser avaliado sem revelar tradução; “Tenho dúvida” revela somente português. “Não lembrei” retorna em dez minutos; avaliações positivas avançam em dias e “Difícil” cresce mais devagar. Concluir atualiza fila/contadores. Familiaridade continua separada da autoavaliação de revisão e não comprova domínio.

Vocabulário: removida sombra interna parcialmente coberta pela imagem; animação mantém tamanho/posição do cartão, mudando borda/fundo. Contorno uniforme, botões flexíveis e ajuste para telas estreitas; marcar conhecida preserva significado já revelado, sem mostrar tradução automaticamente. A correção visual é baseada na inspeção do CSS e ainda requer confirmação no Electron.

Verificado: sintaxe, suíte `npm test` (alfabeto, sinais e novos testes de revisão). Casos incluem lotes até 30 palavras, recarga simulada, corrupção/backup local, preservação de registros válidos, relógio fixo, intervalos, notas inválidas, cliques repetidos, navegação, significado oculto, conclusão e falha de armazenamento sem avançar sessão. DOM/localStorage simulados: não equivalem a reinício real do Electron ou validação visual. Build e conferência dos arquivos no pacote realizados na entrega. Sem novas dependências ou chamadas externas.

Pendentes: testar visualmente a borda no cenário relatado pelo usuário e persistência em reinício real; exportação/importação e critério objetivo de domínio ainda não implementados. A auditoria inicial acima é histórica; os problemas corrigidos nesta atualização deixam de estar pendentes.

## Melhoria de legibilidade e simplicidade (2026-11-10)
Backup anterior às alterações: `backups/hebrew-immersion-before-ux-20261110-175813.tar.gz`, 23 arquivos de código/documentação/configuração, arquivo reaberto e conteúdo conferido. Exclui dependências, dist, credenciais e progresso do perfil Electron. `backups/` adicionado ao .gitignore. Não houve inicialização de Git ou acesso ao perfil pessoal.

Mudanças: explicações de 16 px, transliteração de 16 px, palavras hebraicas de 36 px e controles maiores; cabeçalhos de curso redundantes removidos, preservando detalhes explicativos. Home apresenta continuar estudo e revisão; bookmark local `hi.study.v1` retoma seção, etapa/item ou posição do vocabulário, sem alegar conclusão/domínio. Fonte DejaVu Sans distribuída localmente com licença/procedência; nenhuma dependência instalada ou recurso baixado.

Vocabulário padrão em grupos de seis, biblioteca paginada de doze e filtro por tema, com hebraico/Niqqud/transliteração visíveis e português sob demanda. Mesa ganhou ilustração SVG local distinta da cadeira; demais emojis continuam provisórios. “Conhecida ✓” substitui “Aprendida ✓”; indicador mostra palavras conhecidas dentre o acervo real, excluindo IDs ausentes. Controle de modo sem comportamento efetivo removido.

Alfabeto e sinais destacam o item selecionado; seleção completa disponível em bloco recolhido. Revisão oculta painel inicial/fila durante sessão e permite voltar à fila sem desfazer avaliações já gravadas. Leitura bíblica não antecipa as traduções identificadas; sequência de botões com direção RTL explícita. Não houve revisão linguística externa ou expansão do conteúdo.

Verificações: sintaxe dos scripts, `npm test` com testes anteriores e novos de navegação/paginação/filtros/bookmarks em reinício simulado, tradução oculta, RTL declarado e foco da sessão. Todos aprovados. Recursos CSS/JS locais existem e Fontconfig confirmou cobertura dos caracteres usados na introdução. Build Linux em diretório atualizado e arquivos distribuídos conferidos. Não houve teste visual no Electron nem reinício real do perfil; testes DOM simulados não validam desenho, posicionamento dos sinais ou navegação física por teclado. Sem rede ou serviços pagos. Marco de robustez/persistência continua parcial: bookmarks não são progresso pedagógico concluído.

## Ampliação de Niqqud (2026-11-10)
Backup focado anterior à alteração: `backups/hebrew-immersion-before-niqqud-20261110-180623.tar.gz`, conteúdo conferido. A consulta de referências públicas foi autorizada expressamente pelo usuário; foram feitas apenas buscas genéricas e leituras, sem envio de arquivos.

Acrescentados nove tópicos: os três Hataf, Qamats Qatan, Holam com Vav, Hiriq/Tsere/Segol com Yod e a notação Holam ḥaser em Vav. Total: 18 tópicos, incluindo sinais, combinações de escrita e usos contextuais; isso não representa 18 vogais independentes. Seleção organizada em quatro grupos recolhíveis, com um tópico em destaque. Índices anteriores preservados para compatibilidade dos bookmarks. Comparações adicionais e referências ficam em detalhes expansíveis; sem palavras bíblicas ou traduções novas.

Treino restrito ao grupo selecionado; alternativas distintas. Qamats Qatan e Holam ḥaser em Vav usam perguntas conceituais, evitando distinções arbitrárias por desenho isolado. Rastreabilidade, fontes e limites: [docs/NIQQUD-SOURCES.md](docs/NIQQUD-SOURCES.md).

Verificado: sintaxe, `npm test`, cobertura dos novos caracteres pela fonte local e build Linux atualizado/conferido. Testes cobrem todos os tópicos, grupos sem duplicação, índices legados, alternativas, limite do grupo e perguntas contextuais. Continuação de estudo e revisão continuam cobertas pela suíte anterior. Ainda sem conferência visual no Electron, áudio ou revisão linguística independente; a ampliação não conclui todo o curso de Niqqud.

## Plano de estudos (2026-11-10)
Backup focado antes da alteração: `backups/hebrew-immersion-before-roadmap-20261110-181955.tar.gz`, sete arquivos conferidos. Aba integrada à navegação e ao início, sem dependências novas ou consultas externas. Dados em `src/roadmap-data.js`; apresentação, agenda e persistência validada em `src/roadmap.js`.

24 blocos mensais de quatro semanas (96 temas semanais); 3/5/6 dias e 20/30/45/60 minutos configuráveis. Cada dia de estudo tem revisão, foco e prática; pausas não geram pendências. As primeiras duas semanas distribuem as 22 letras em grupos, com dia final de retomada. Atalhos levam ao alfabeto, Niqqud, Dagesh, vocabulário, revisão, roteiro da gramática e exemplo de leitura conforme a atividade. Tópicos futuros indicam explicitamente falta de aula completa e necessidade de material complementar. Cada bloco tem critério de avanço e pode ser repetido. A visão dos livros oferece rotina de leitura acompanhada e registro manual dos 39 livros, sem texto integral, prazo de proficiência ou inferência de domínio.

`hi.roadmap.v1` salva escolhas, posição e marcações localmente; mantém marcações ao mudar a rotina e usa recuperação/avisos existentes. Progresso do plano não altera vocabulário, SRS ou bookmarks do curso. Testes de navegação, agenda em todos os ritmos, cobertura das 22 letras, pausa, retenção/recarga, 39 livros, corrupção e falha de salvamento adicionados a `npm test`. Testes usam DOM e perfil simulados; aparência e reinício real do Electron ainda não validados. O plano é uma orientação pedagógica proposta e não substitui os módulos e materiais ainda pendentes.

## Preparação do repositório — 2026-11-11

Projeto agora localizado em `local/hebrew-immersion/`, dentro da pasta de projetos GitHub. Os caminhos absolutos e estados de ambiente nas seções anteriores são registros históricos, não instruções atuais de instalação.

README consolidado para apresentação pública do protótipo: recursos disponíveis, requisitos, instalação com lockfile, testes, build portátil, estrutura, dados locais, IA opcional e limites. Adicionados CONTRIBUTING.md, .editorconfig, .gitattributes e documentação dos rascunhos de packaging. A estrutura de código existente foi preservada.

.gitignore ampliado para excluir o atalho da raiz com caminho pessoal, configurações de editor e perfis locais. O atalho existente foi preservado no disco; não deve acompanhar a publicação. Dependências, builds, backups, logs e segredos continuam excluídos. Versões do package-lock.json alinhadas ao package.json (0.3.0), sem alterar versões de dependências.

Verificado nesta etapa: `npm test` aprovado nos cinco arquivos de teste; `node --check` aprovado nos dez arquivos JavaScript da aplicação; versões/dependências do manifesto e lockfile coerentes; links locais dos documentos novos/revisados válidos. Varredura estática dos arquivos candidatos não encontrou padrões de chaves de API ou chaves privadas; não equivale a uma auditoria completa de segredos. Nenhuma dependência instalada ou atualizada, chamada à IA, build novo ou validação visual realizada.

Licença do código/conteúdo autoral ainda não definida; não foi atribuída uma licença sem decisão do responsável. Licença e procedência da fonte permanecem preservadas. Repositório Git não inicializado, sem commit, remoto, mudança para pushed/ ou push nesta etapa. A publicação é uma etapa posterior à revisão do usuário.

## Publicação autorizada — 2026-11-11

Usuário autorizou criar o repositório público `hebrew-immersion`, mover para `pushed/` e fazer o push. Projeto movido para `pushed/hebrew-immersion/` e Git inicializado com branch `main`. O atalho local ignorado foi ajustado ao novo caminho.

A integração GitHub reconhece a conta, mas não expõe criação de repositórios. GitHub CLI ausente e acesso direto a api.github.com indisponível nesta sessão (falha de resolução DNS). Preparação do commit local segue autorizada; criação remota e push aguardam acesso adequado. Não há confirmação de publicação.

## 2026-11-12 — Alfabeto em uma visão compacta

As quatro etapas do alfabeto foram reunidas em uma tela: grade permanente com as 22 letras em ordem RTL, nomes e indicações de som, com as cinco formas finais ao lado das letras correspondentes. A seleção abre o detalhe com foco acessível, sem navegação por setas. Orientações e treino continuam disponíveis em blocos recolhíveis. Marcadores antigos de introdução/formas finais retornam à grade; a letra selecionada continua sendo restaurada. Niqqud e Dagesh não foram alterados.

Validação: suíte automatizada aprovada (alfabeto, revisão, plano, sinais e continuidade); sem conferência visual em sessão gráfica ou revisão linguística externa. Conteúdo e limitações de pronúncia preservados.

### Ajuste visual do alfabeto

Grade com cartões uniformes, nomes únicos, letras sem Dagesh, ordem RTL numerada e formas finais em tamanho secundário. Sons e observações ficam no painel de detalhes, lateral em janelas maiores e abaixo em menores. Removida a seção de variantes; o treino agora pede nomes para não exigir distinções de pontos estudadas em outra aba. Conteúdo de Niqqud/Dagesh preservado. Suíte automatizada aprovada; sem conferência visual em sessão gráfica.

### Niqqud em categorias e exemplos gráficos

Niqqud reúne os 18 tópicos existentes em quatro categorias sempre visíveis, com cartões e detalhes ao selecionar, sem navegação por etapas. Mantidas explicações de Sheva/Hataf, letras vocálicas e leitura contextual, comparações e treino por categoria. A seleção mostra combinações gráficas com as 22 letras; Holam ḥaser editorial permanece exclusivamente em Vav. Exemplos não são palavras nem validação de uso gramatical; Hataf e Qamats Qatan têm ressalvas explícitas. Não foram acrescentados sinais ou fontes; Dagesh e outras marcas não vocálicas permanecem na aba própria. O detalhe de Shin agora mostra שׁ/Shin/SH e שׂ/Sin/S com posição dos pontos.

Validação automatizada: suíte aprovada, incluindo categorias, geração dos exemplos, combinações com Vav/Yod e restrição da marca editorial ao Vav. Conferência visual no desktop e revisão linguística independente permanecem pendentes.

### Correção de renderização dos cartões de Niqqud

Substituído o círculo pontilhado de apoio por Bet (Alef nos Hataf), evitando sobreposição dos sinais combinantes com U+25CC na fonte local. Área dos glifos ampliada, com folga vertical e sem encolhimento flex. Mantidos os sinais Unicode reais. Testes de sinais verificam as letras de apoio; validação visual pelo usuário pendente.

### Círculo pontilhado e classificação das vogais
A pedido do usuário, os cartões voltaram ao círculo pontilhado, desenhado em SVG com os sinais em posições explícitas para evitar o problema de ancoragem da fonte. Exemplos com letras continuam em Unicode. Cartões e detalhes mostram classificação tradicional longa/breve/reduzida ou dependente de contexto (Sheva), com ressalva sobre diferenças entre tradições e duração fonética. Combinações com Vav/Yod mantidas por inteiro. Validação visual ainda pendente.

- Ajuste solicitado: sinais básicos nos cartões SVG reduzidos proporcionalmente ao círculo, sem alterar seu tamanho: pontos com raio de 1,8 unidades (antes 2,8), traços de 12 unidades (antes 22) e espessura de 2 (antes 3).

### Dagesh e sinais em cartões
A aba foi reorganizada no padrão visual de Niqqud: três categorias permanentes, sete tópicos selecionáveis (Qal, Chazaq, Shin, Sin, Mappiq, Meteg e Sheva), explicações/comparações ao clicar e introdução/treino recolhíveis. Reaproveitado o conteúdo existente; treino conceitual, sem classificar pontos isolados. Sem etapas nem setas. Suíte automatizada aprovada; conferência visual e avaliação do usuário pendentes.

`AGENTS.md` agora exige empacotar alterações do app e conferir os destinos dos ícones do menu/desktop; corrigir atalhos apenas quando necessário, respeitando permissões e preservando o perfil do Electron.

### Alfabeto demonstrativo e comparação de Dagesh
Detalhes de Qal/Chazaq agora incluem grade RTL de 22 letras: Qal marca apenas בגדכפת; Chazaq marca 17 consoantes, mantendo guturais e Resh sem ponto pela regra introdutória. Incluídas tabela comparativa e tabela recolhível das seis realizações tradicionais. Distinguidos fechamento/oclusão, geminação e aparência idêntica; ressalva explícita para Vav/Shuruq. Fonte primária consultada: BBH2 Study Guide §§1–2.13, documentada em docs/DAGESH-SOURCES.md; sem exemplos lexicais novos. Validação visual e revisão externa pendentes.

### Leitura bíblica guiada e barra de progresso
Preservado o layout de versículo e botões de palavras. Adicionados seletores de livro/capítulo/versículo para quatro passagens piloto: Gênesis 1:1 e 1:3, Salmos 119:105 e Provérbios 10:12. Palavras com transliteração simplificada, notas e significado sob demanda; tradução do trecho recolhida. Modo de leitura limpa e posição/palavra/modo persistidos em hi.reading.v1, integrados à continuidade da página inicial. Sem expansão da contagem de conteúdo linguisticamente revisado. Texto/morfologia OSHB/WLC extraídos dos XML públicos, com licença, atribuição, adaptações e limites em docs/READING-SOURCES.md e no próprio app. Nenhuma rede necessária em execução.

AGENTS.md agora pede barra textual estimada nas atualizações, com 100% somente após conclusão/verificações. README atualizado para a coleção piloto. Testes cobrem seleção, limites, tradução oculta, reinício e recuperação de registro corrompido; conferência visual real e revisão linguística independente permanecem pendentes.

### Auditoria com três agentes e Electron real
Executada auditoria de quizzes, fluxo/legibilidade e persistência. Backup antes das correções em backups/before-audit-fixes-20261112-151720.tar.gz (ignorado). Corrigidos: quiz de alfabeto seguindo seleção; feedback/guardas e alternativas desabilitadas no vocabulário; estilos dos quizzes de sinais; consulta a sinais preservando leitura com botão retorno; deep-link Sheva; foco nos controles/abas e retorno aos cartões; mensagens de falha/sucesso parcial na leitura e familiaridade/SRS; retomada usando estado próprio mais recente da leitura. Legendas ajustadas.

Novas regressões em tests/audit-state.test.cjs, tests/study.test.cjs e tests/alphabet.test.cjs. Suíte de seis arquivos aprovada antes do empacotamento. Electron real com perfil isolado: dez páginas em 1280×850 e 880×650, sem erros de JavaScript nem overflow horizontal nos cenários; cliques, foco, exemplos, respostas e falha de salvamento verificados. Capturas finais renderizadas fora da tela. Relatório completo em docs/AUDIT-2026-11-12.md; revisão linguística, leitor de tela e teclado manual completo continuam pendentes. Não houve chamada online/paga nem uso do perfil pessoal.

Auditoria encerrada: suíte final aprovada; 20 cenários de tela e 12 verificações no Electron concluídos sem falhas nos critérios avaliados. Pacote regenerado e arquivos de src conferidos byte a byte no app.asar; atalhos do menu/desktop apontam para a pasta oficial. Reabrir o aplicativo pelo ícone para usar as correções.

### Revisão: seleção visível e confirmação antes de avançar
Usuário relatou Fácil sempre destacado e avanço sem feedback. O destaque era fixo do botão primário, não uma seleção; a sessão avançava imediatamente. Agora as quatro avaliações começam neutras; ao escolher, apenas a selecionada se destaca, todas são bloqueadas para evitar dupla gravação, aparece confirmação de salvamento e agendamento (10 minutos ou dias), barra/contador atualizam e Próxima palavra/Concluir revisão permite avançar explicitamente. Reduzida a ilustração para melhorar o espaço da sessão. Testes de revisão adaptados e regressão adicionada; suíte completa aprovada. Electron isolado confirmou seleção, feedback, conclusão e persistência após recarregar.

README recebeu aviso destacado, solicitado pelo usuário, de que o app está em desenvolvimento, não está 100% completo e pode conter bugs e falhas de interface/funcionamento. Testes não garantem ausência de problemas. A descrição da Revisão acompanha seleção explícita, confirmação do agendamento e avanço manual.
