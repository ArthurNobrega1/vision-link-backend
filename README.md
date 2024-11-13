# Vision Link

## Visão Geral

- Este back-end oferece suporte ao aplicativo para deficientes visuais, proporcionando funcionalidades de autenticação, cadastro de usuário, recuperação de senha e integração com MongoDB. O projeto é construído com TypeScript e Node.js e utiliza o Firebase e MongoDB para armazenar dados.

## Estrutura do Projeto
- Docker Compose: Configuração para levantar serviços com MongoDB e Mongo Express.

- Serviços Principais:
    - `CreateUserService`: Lida com a criação de usuários e validações (nome, email, senha).

    - `ForgotPasswordController`: Envia email para redefinição de senha, usando o provedor de email EtherealMailProvider.

- Middleware de Autenticação: `ensureAuthenticated` valida o token JWT para proteger rotas autenticadas.

## Tecnologias e Dependências
- Node.js e TypeScript

- MongoDB como banco de dados

- JWT para autenticação e segurança

- Docker e Docker Compose

- Firebase (configuração específica não detalhada no conteúdo analisado)

- Configuração do Ambiente

Instale as dependências:

````sh
npm install
````

Configure o arquivo .env com as variáveis necessárias, incluindo:

````sh
TOKEN_SECRET=seu_token_secreto
MONGO_URI=sua_uri_mongodb
````

Para levantar o MongoDB e Mongo Express via Docker:

````sh
docker-compose up -d
````

## Executando o Back-End

Para iniciar o servidor localmente:

````sh
npm run dev
````
### Rotas Principais

- Cadastro de Usuário: Rota que permite criar um novo usuário com validação completa dos dados.

- Autenticação: Middleware ensureAuthenticated que protege rotas utilizando JWT.

- Esqueci minha senha: Envia um email para o usuário redefinir sua senha, usando EtherealMailProvider.

## Equipe:

- Arthur Nóbrega Leite
- Augusto Souza Freitas Teixeira
- Guilherme de Medeiros Moura
- Victor de Souza Xavier Fernandes