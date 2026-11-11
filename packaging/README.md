# Empacotamento Flatpak — rascunhos

Os dois manifestos YAML desta pasta são rascunhos históricos equivalentes e **não produzem um instalador funcional**. Ainda faltam a distribuição do Electron, um launcher executável, arquivos da aplicação e ícone; as permissões também precisam ser revisadas para a IA opcional.

O arquivo `hebrew-immersion.desktop` é um modelo para o futuro pacote, sem caminhos pessoais. O atalho `hebrew-immersion.desktop` da raiz é específico da máquina local e fica fora do Git.

A distribuição disponível para desenvolvimento é a pasta portátil Linux gerada por `npm run dist`, descrita no [README principal](../README.md). Flatpak, instalação e permissões dependem de implementação e validação próprias.
