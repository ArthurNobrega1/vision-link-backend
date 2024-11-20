# Vision Link (Backend)

- App mobile para se comunicar com ferramenta que auxilia a locomoção de deficientes visuais
- vamos usar as seguintes tecnologias: 
   - Typescript
   - Express
   - MongoDb
   - Mongo Express
   - Docker

## Instalação
Para rodar o projeto, siga os seguintes passos:

1. Clone o repositório:
   ```bash
   git clone https://github.com/ArthurNobrega1/vision-link-backend.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo .env baseado no .env.example que existe no repositório
4. Configuração do Backend:
   Para gerar tokens de sessão no backend, é necessário configurar a variável `TOKEN_SECRET` no arquivo `.env`:
   ```env
   TOKEN_SECRET=<seu-token-secreto>
   ```
5. Caso queira usar **MongoDB sem Docker**, basta preencher as variáveis `MONGO_HOST`, `MONGO_PORT`, `MONGO_DB`, `MONGO_USER`, e `MONGO_PASS` com os dados do seu banco (exemplo de configuração para localhost) (pode pular para a instução 11):
   ```env
   # Connection Backend OneCompiler
   MONGO_HOST=<host>
   MONGO_PORT=<porta>
   MONGO_DB=<banco>
   MONGO_USER=<usuário>
   MONGO_PASS=<senha>
   ```
6. Configuração do Banco de Dados (MongoDB):
   Caso esteja utilizando **Docker** para o backend e banco de dados, você pode deixar as variáveis como estão no exemplo abaixo e outras configurações do .env:
   ```env
   # Connection Backend Docker
   MONGO_HOST=localhost
   MONGO_PORT=27017
   MONGO_DB=vision-link
   MONGO_USER=admin
   MONGO_PASS=password

   # Credentials Database
   MONGO_INITDB_ROOT_USERNAME=admin
   MONGO_INITDB_ROOT_PASSWORD=password

   # Connection Mongo Express
   ME_CONFIG_MONGODB_URL='mongodb://admin:password@mongodb:27017'

   # Credentials Mongo Express
   ME_CONFIG_BASICAUTH_USERNAME=admin
   ME_CONFIG_BASICAUTH_PASSWORD=pass
   ```
7. Para rodar o banco e o Mongo Express no **Docker**, use o comando:
   ```bash
   docker-compose up -d
   ```
   Esse comando vai levantar o **MongoDB** e o **Mongo Express**, onde você pode acessar a interface do MongoDB através de [http://localhost:5051](http://localhost:5051).
8. Criar o banco de dados (se estiver usando Docker):
   Após subir os containers do Docker com o comando `docker-compose up`, é necessário criar o banco de dados dentro do MongoDB.
   
   Para isso, execute o comando abaixo para acessar o terminal do MongoDB:
   ```bash
   docker-compose exec mongodb bash
   ```
9. Dentro do container, abra o **mongo shell** usando seu usuário com o comando:
   ```bash
   mongosh --host mongodb --port 27017 -u "admin" -p "password" --authenticationDatabase "admin"
   ```
10. Agora, no **mongo shell**, crie o banco de dados com o comando (Isso criará o banco de dados `vision-link` que será utilizado pela aplicação):
   ```js
   use vision-link
   ```

11. Crie um usuário padrão para acesso do banco:
```js
db.createUser({ user: "admin", pwd: "password", roles: [{ role: "root", db: "admin" }] })
   ```

12. Escreva exit 2x ou crie outro terminal
13. Inicie o projeto:
   ```bash
   npm run dev
   ```

## Padrão de commits
Utilizaremos como padrão de commits o conventional commits, são basicamente uma formalização das mensagens de commits. Isso vai facilitar o acompanhamento de mudanças.

````sh
<tipo>(<escopo>): <descrição>
````

`<tipo>`: Descreve o propósito do commit(obrigatório)

`<escopo>`: Mostra a área que o commit afeta.

`<descrição>`: Descreve o que o commit realiza(obrigatório)
    

## Tipos comuns de commit 

- `feat` : Para novas funcionalidades.

- `fix` : Para correção de bugs.

- `docs` : Para alterações na documentação.

- `style` : Para formatação, estilo de código, sem mudanças no código de produção.

- `refactor` : Para refatorações de código.

- `test` : Para adição ou modificação de testes.

- `chore` : Para tarefas de manutenção, como atualização de dependências.

## Exemplos de Mensagens de Commit
Aqui estão alguns exemplos de conventional commits

```sh
feat(login): adicionar funcionalidade de login 
```
```sh
fix(api): corrigir erro de rota 
```
## Equipe:

- Arthur Nóbrega Leite
- Augusto Souza Freitas Teixeira
- Guilherme de Medeiros Moura
- Victor de Souza Xavier Fernandes 
