# App de Lembretes Vue3 com PrimeVue e TypeScript

Este é um aplicativo de lembretes desenvolvido em Vue.js 3, utilizando PrimeVue e TypeScript. O aplicativo permite que os usuários criem, editem e excluam lembretes, armazenando as informações em um banco de dados MySQL. Ele se conecta a uma API Python para executar operações no banco de dados. A API Python está hospedada no repositório [python-api](https://github.com/rodolfinhoc/python-api).

## Configuração do Banco de Dados

O aplicativo utiliza um banco de dados MySQL para armazenar os lembretes. Aqui estão as informações de acesso ao banco de dados:

- Servidor: sql10.freemysqlhosting.net
- Nome: sql10620819
- Nome de usuário: sql10620819
- Senha: W4R29qXrxQ
- Porta: 3306

Certifique-se de ter um ambiente de banco de dados configurado com essas informações antes de executar o aplicativo.

## Configuração do Ambiente de Desenvolvimento

Antes de iniciar o desenvolvimento, você precisa configurar o ambiente de desenvolvimento. Siga as etapas abaixo:

1. Clone o repositório do [python-api](https://github.com/rodolfinhoc/python-api) e siga as instruções de configuração da API Python.

2. Certifique-se de ter o Node.js instalado em seu sistema. Você pode fazer o download e instalar o Node.js a partir do site oficial: [https://nodejs.org](https://nodejs.org)

3. Navegue até a pasta do projeto e instale as dependências usando o seguinte comando no terminal:

   ```
   npm install
   ```

## Executando o Aplicativo

Após configurar o ambiente de desenvolvimento, você pode executar o aplicativo. Certifique-se de ter a API Python em execução antes de iniciar o aplicativo Vue.js.

1. Navegue até a pasta do projeto no terminal.

2. Execute o seguinte comando para iniciar o aplicativo:

   ```
   npm run serve
   ```

3. O aplicativo será iniciado e estará disponível em `http://localhost:8080`.

## Personalização e Extensão

Você pode personalizar e estender o aplicativo de acordo com suas necessidades. Aqui estão alguns pontos de partida para expandir o aplicativo:

- Adicione recursos de autenticação para permitir que os usuários façam login e mantenham seus próprios lembretes.
- Melhore a interface do usuário adicionando recursos visuais, como cores, ícones e animações.
- Implemente recursos de notificação para lembrar os usuários de tarefas pendentes.
- Adicione recursos de pesquisa e filtragem para facilitar a navegação pelos lembretes.
- Implemente recursos de compartilhamento para permitir que os usuários compartilhem lembretes com outras pessoas.