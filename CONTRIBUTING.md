# Como contribuir

O Hebrew Immersion é um protótipo de estudo de hebraico bíblico. Antes de alterar o projeto, leia [PROJECT.md](PROJECT.md), o histórico em [PROGRESS.md](PROGRESS.md) e as convenções em [AGENTS.md](AGENTS.md).

## Preparar e verificar

Use Node.js 22.x e npm. Execute `npm ci` para instalar as dependências e `npm start` para abrir o aplicativo. Rode `npm test` antes de propor mudanças. A suíte pode rodar sem instalar o Electron e não usa serviços pagos.

Faça alterações pequenas e focadas. Preserve o funcionamento offline, Unicode/Niqqud, leitura RTL e a separação entre familiaridade e domínio. Interface e documentação usam português brasileiro; identificadores de código usam inglês.

Mudanças de interface devem ser conferidas no Electron, incluindo teclado, foco e sinais hebraicos. Testes com DOM simulado não validam a aparência. Informe o que foi testado e as limitações restantes.

## Conteúdo didático

Registre fontes, procedência, licença e estado de revisão do material. Diferencie hebraico bíblico e moderno e identifique a tradição de pronúncia quando necessário. Não apresente conteúdo demonstrativo como material revisado ou curso completo.

## Relatar problemas

Descreva o comportamento esperado, os passos para reproduzir, a versão do aplicativo e o sistema utilizado. Remova chaves de API e dados pessoais de logs e imagens. Para falhas de segurança, não publique credenciais nem dados privados em issues.

## Arquivos locais

Não inclua `node_modules/`, `dist/`, `backups/`, perfis Electron, logs, segredos ou atalhos com caminhos pessoais. Mantenha o lockfile junto de alterações nas dependências e atualize a documentação quando mudar o comportamento.

A licença do código e do conteúdo autoral ainda está pendente de definição pelo responsável do projeto.
