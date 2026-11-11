# Hebrew Immersion

Aplicativo desktop para estudar **hebraico bíblico**, com interface em português brasileiro. Combina vocabulário com Niqqud e transliteração, introduções ao alfabeto e aos sinais, exercícios e revisão espaçada. O estudo básico funciona offline, sem login; o professor com IA é opcional.

**Versão 0.3.0 · protótipo em desenvolvimento · foco em Fedora/Linux.** O conteúdo é demonstrativo e ainda requer revisão linguística. A meta de 2.000 palavras e o curso completo são planos futuros.

## Recursos disponíveis

- **Vocabulário:** 30 entradas demonstrativas, em grupos de seis ou biblioteca de doze por página, com filtros por tema. Hebraico e transliteração ficam visíveis; “Tenho dúvida” revela português. “Já conheço” registra familiaridade, sem comprovar domínio.
- **Alfabeto:** exploração das 22 letras e cinco formas finais, explicações e treino de reconhecimento.
- **Niqqud e Dagesh:** introduções e exercícios locais; Niqqud reúne 18 tópicos entre sinais, combinações e usos contextuais, organizados em quatro grupos.
- **Revisão espaçada:** fila de vencimentos, inclusão de palavras em lotes e autoavaliação de recordação.
- **Continuidade:** posição de estudo e progresso salvos localmente no perfil do Electron.
- **Plano de estudos:** 24 blocos de quatro semanas, rotina ajustável e registro manual da leitura de 39 livros. Indica os temas que exigem material complementar.
- **Leitura e gramática:** exemplo inicial de Gênesis 1:1 e roteiro de gramática, ainda sem curso completo ou texto integral da Bíblia.
- **Professor com IA:** envio opcional de perguntas à API da OpenAI, mediante consentimento no aplicativo e chave própria.

As ilustrações usam principalmente emojis provisórios. Não há áudio de pronúncia disponível. As marcações e autoavaliações não certificam domínio ou fluência.

## Executar em desenvolvimento

Requisitos: **Node.js 22.x**, npm e ambiente gráfico Linux compatível com Electron. O foco do projeto é Fedora Workstation 44; outras plataformas ainda não foram validadas.

Na pasta do projeto:

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

Esses testes não substituem a conferência visual, a navegação por teclado ou o reinício real do Electron. O histórico e os limites de validação estão em [PROGRESS.md](PROGRESS.md).

## Gerar a versão portátil para Linux

Depois de instalar as dependências:

```bash
npm run dist
```

O comando usa o Electron instalado em `node_modules/` e gera `dist/pronto/linux-unpacked/`. Em um ambiente novo, o empacotador também pode precisar baixar ferramentas auxiliares.

No gerenciador de arquivos, abra essa pasta e execute `hebrew-immersion`. Para transportar o aplicativo, copie **a pasta inteira**, não apenas o executável. O pacote gerado inclui Electron e dispensa Node.js/npm para uso cotidiano.

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

Veja [CONTRIBUTING.md](CONTRIBUTING.md) antes de propor mudanças. A especificação está em [PROJECT.md](PROJECT.md); a auditoria e os próximos marcos estão em [PROGRESS.md](PROGRESS.md). Esse histórico contém observações antigas: as atualizações posteriores indicam quais problemas já foram corrigidos.

A expansão do vocabulário depende de fontes, licenças e revisão editorial. As referências de Niqqud estão em [docs/NIQQUD-SOURCES.md](docs/NIQQUD-SOURCES.md).

## Licenciamento

Ainda não foi definida uma licença para o código e o conteúdo autoral do projeto; a publicação do repositório não concede automaticamente uma licença de reutilização. A fonte DejaVu Sans mantém sua licença própria em [src/assets/fonts/LICENSE-DejaVu.txt](src/assets/fonts/LICENSE-DejaVu.txt), com procedência em [src/assets/fonts/README.md](src/assets/fonts/README.md).
