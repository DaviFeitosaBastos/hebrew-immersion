# Hebrew Immersion

Aplicativo desktop para estudar **hebraico bíblico**, com interface em português brasileiro. Combina vocabulário com Niqqud e transliteração, introduções ao alfabeto e aos sinais, exercícios e revisão espaçada. O estudo básico funciona offline, sem login; o professor com IA é opcional.

**Versão 0.3.0 · em desenvolvimento · foco em Fedora/Linux.**

> **O aplicativo ainda não está 100% completo e pode conter bugs, falhas de funcionamento e problemas de interface.** Recursos e conteúdo podem mudar durante o desenvolvimento. Os testes cobrem cenários específicos e não garantem ausência de problemas.

O conteúdo é demonstrativo e ainda requer revisão linguística. A meta de 2.000 palavras e o curso completo são planos futuros.

## Recursos disponíveis

- **Vocabulário:** 30 entradas demonstrativas, em grupos de seis ou biblioteca de doze por página, com filtros por tema. Hebraico e transliteração ficam visíveis; “Tenho dúvida” revela português. “Já conheço” registra familiaridade, sem comprovar domínio.
- **Alfabeto:** grade com as 22 letras em ordem hebraica, da direita para a esquerda, nomes e cinco formas finais ao lado das letras correspondentes. Ao selecionar, aparecem som, dicas de reconhecimento e a distinção Shin/Sin. Inclui treino de nomes.
- **Niqqud:** cartões em quatro categorias: sinais básicos; Sheva e vogais reduzidas; vogais com letras; leitura contextual e edição. Reúne 18 tópicos, incluindo combinações e usos contextuais — não são 18 sinais vocálicos distintos. Os detalhes mostram demonstrações gráficas com as letras, respeitando as restrições de cada marca, e há treino por categoria. Longa, breve e reduzida são classificações didáticas tradicionais, não uma duração fixa para toda tradição de pronúncia.
- **Dagesh e sinais:** cartões em três categorias, com Dagesh Qal/Chazaq, Shin/Sin, Mappiq, Meteg e Sheva. Explicações e comparações ao clicar; treino por descrição, sem tentar classificar Qal/Chazaq pelo ponto isolado.
- **Revisão espaçada:** fila de vencimentos, inclusão de palavras em lotes e autoavaliação de recordação. A opção escolhida fica destacada, o próximo agendamento é mostrado e a sessão avança pelo botão “Próxima palavra”, com barra de progresso.
- **Continuidade:** posição de estudo e progresso salvos localmente no perfil do Electron.
- **Plano de estudos:** 24 blocos de quatro semanas, rotina ajustável e registro manual da leitura de 39 livros. Indica os temas que exigem material complementar.
- **Leitura bíblica:** coleção piloto com Gênesis 1:1 e 1:3, Salmos 119:105 e Provérbios 10:12; seleção por livro/capítulo/versículo, palavras clicáveis, transliteração, notas e tradução sob demanda. Modo de leitura limpa e posição salva. Texto OSHB/WLC com apresentação simplificada; notas ainda sem revisão linguística independente. Não inclui a Bíblia inteira.
- **Gramática:** roteiro de temas, ainda sem curso completo.
- **Professor com IA:** envio opcional de perguntas à API da OpenAI, mediante consentimento no aplicativo e chave própria.

As ilustrações usam principalmente emojis provisórios. Não há áudio de pronúncia disponível. As marcações e autoavaliações não certificam domínio ou fluência.

## Executar em desenvolvimento

Requisitos: **Node.js 22.x**, npm e ambiente gráfico Linux compatível com Electron. O foco do projeto é Fedora Workstation 44; outras plataformas ainda não foram validadas.

Clone ou baixe este repositório e abra sua pasta. Em seguida:

```bash
npm ci
npm start
```

A instalação das dependências requer internet e baixa o Electron. Depois de instalado, o conteúdo local pode ser estudado sem rede. O repositório inclui `package-lock.json` para reproduzir as versões das dependências.

## Testes

```bash
npm test
```

A suíte usa o executor nativo do Node.js, sem API paga ou chamadas de rede. Pode ser executada antes de instalar as dependências do Electron. Cobre alfabeto, sinais, revisão, persistência, navegação, vocabulário e plano de estudos, usando DOM e armazenamento simulados.

Uma auditoria complementar com agentes e execução real do Electron está registrada em [docs/AUDIT-2026-11-12.md](docs/AUDIT-2026-11-12.md).

Esses testes não substituem a conferência visual, a navegação por teclado ou o reinício real do Electron. O histórico e os limites de validação estão em [PROGRESS.md](PROGRESS.md).

## Gerar a versão portátil para Linux

Depois de instalar as dependências:

```bash
npm run dist
```

O comando usa o Electron instalado em `node_modules/` e gera `dist/pronto/linux-unpacked/`. Em um ambiente novo, o empacotador também pode precisar baixar ferramentas auxiliares.

No gerenciador de arquivos, abra essa pasta e execute `hebrew-immersion`. Para transportar o aplicativo, copie **a pasta inteira**, não apenas o executável. O pacote gerado inclui Electron e dispensa Node.js/npm para uso cotidiano.

### Atualizar o aplicativo

Quando usar `npm start`, feche e reabra o aplicativo para carregar as mudanças do código. Se usar a versão portátil ou um ícone que aponta para ela, execute novamente `npm run dist` após atualizar o código. **Editar `src/` ou baixar novas alterações do GitHub não atualiza um pacote já gerado.** Feche o aplicativo antes de gerar a nova versão e abra-o novamente depois.

### Abrir pelo menu de aplicativos

O empacotamento atual não instala automaticamente um ícone no menu. Para criar um lançador Linux, salve um arquivo `org.hebrewimmersion.App.desktop` em `~/.local/share/applications/`, com conteúdo semelhante a:

```ini
[Desktop Entry]
Type=Application
Name=Hebrew Immersion
Comment=Estudo de hebraico bíblico
Exec=/CAMINHO/DO/PROJETO/dist/pronto/linux-unpacked/hebrew-immersion
Icon=/CAMINHO/DO/PROJETO/src/assets/app-icon.png
Terminal=false
Categories=Education;Languages;
```

Substitua `/CAMINHO/DO/PROJETO` pelo caminho absoluto da sua cópia, sem usar `~` ou variáveis dentro do arquivo. Se houver espaços no caminho do executável, envolva o valor de `Exec` em aspas duplas. O destino deve ser o executável do pacote completo. Se mover a pasta, atualize os caminhos do lançador; se apenas gerar uma nova versão no mesmo lugar, o ícone pode continuar igual. Uma cópia na área de trabalho pode exigir permissão de execução e confirmação de confiança, conforme o ambiente gráfico.

Os atalhos específicos de cada máquina não são distribuídos pelo repositório.

Os arquivos de `packaging/` são **rascunhos incompletos de Flatpak**, não instaladores prontos. Consulte [packaging/README.md](packaging/README.md). Binários, dependências e backups não fazem parte do código versionado.

## Dados locais e IA opcional

O progresso fica no armazenamento local do perfil do Electron, separado do código e do pacote portátil. Copiar a pasta do aplicativo não transfere o progresso. Exportação e importação ainda não foram implementadas; falhas de armazenamento são avisadas e registros corrompidos são preservados localmente para recuperação.

O estudo básico não exige conta ou chave. Ao usar o professor com IA, a pergunta, o modelo escolhido e as instruções do professor são enviados a `api.openai.com`; a chave própria autentica a solicitação. O aplicativo não salva a chave em disco nem inclui o histórico de progresso nessa solicitação. O uso pode gerar cobranças na conta do provedor. Não coloque chaves em arquivos, issues ou capturas de tela.

A integração ainda tem pendências de segurança registradas na auditoria de [PROGRESS.md](PROGRESS.md), incluindo endurecimento do IPC e da política de conteúdo. A consulta online não foi validada nesta preparação do repositório.

## Estrutura do repositório

```text
hebrew-immersion/
├── main.js                  # Janela Electron e integração de IA
├── preload.js               # Ponte restrita entre janela e processo principal
├── src/
│   ├── index.html           # Interface e carregamento dos módulos
│   ├── style.css            # Tema e layout
│   ├── app.js               # Navegação e funcionalidades de base
│   ├── alphabet.js          # Alfabeto e exercícios
│   ├── signs.js             # Niqqud e Dagesh
│   ├── reading-data.js      # Trechos piloto com procedência registrada
│   ├── reading.js           # Leitura guiada e posição local
│   ├── hybrid.js            # Revisão e formulário de IA
│   ├── progress.js          # Validação e persistência local
│   ├── study.js             # Início, vocabulário e posição de estudo
│   ├── roadmap-data.js      # Conteúdo do plano de estudos
│   ├── roadmap.js           # Agenda e marcações do plano
│   ├── words.json           # Vocabulário demonstrativo
│   └── assets/              # Ícone e fonte local com licença
├── tests/                   # Testes nativos do Node.js
├── docs/                    # Referências de conteúdo
├── packaging/               # Rascunhos de distribuição Flatpak
├── package.json
├── package-lock.json
├── AGENTS.md                # Instruções para agentes de desenvolvimento
├── CONTRIBUTING.md          # Orientações para contribuir
├── PROJECT.md               # Especificação e arquitetura
└── PROGRESS.md              # Histórico, lacunas e roteiro
```

## Desenvolvimento e conteúdo

O [AGENTS.md](AGENTS.md) orienta agentes de desenvolvimento. Quando presente, `CONTEXT.local.md` guarda somente o contexto local de continuidade e é ignorado pelo Git; não é necessário para clonar, executar ou contribuir. Não coloque credenciais nesse arquivo.


Veja [CONTRIBUTING.md](CONTRIBUTING.md) antes de propor mudanças. A especificação está em [PROJECT.md](PROJECT.md); a auditoria e os próximos marcos estão em [PROGRESS.md](PROGRESS.md). Esse histórico contém observações antigas: as atualizações posteriores indicam quais problemas já foram corrigidos.

A expansão do vocabulário depende de fontes, licenças e revisão editorial. As referências de Niqqud estão em [docs/NIQQUD-SOURCES.md](docs/NIQQUD-SOURCES.md).

As fontes, licenças e limites da coleção piloto de leitura estão em [docs/READING-SOURCES.md](docs/READING-SOURCES.md).

## Licenciamento

Ainda não foi definida uma licença para o código e o conteúdo autoral do projeto; a publicação do repositório não concede automaticamente uma licença de reutilização. A fonte DejaVu Sans mantém sua licença própria em [src/assets/fonts/LICENSE-DejaVu.txt](src/assets/fonts/LICENSE-DejaVu.txt), com procedência em [src/assets/fonts/README.md](src/assets/fonts/README.md).
