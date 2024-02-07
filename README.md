## Instalação

```bash
$ npm install
```

## Rodando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Teste

```bash
# testes unitários
$ npm run test
```
## Iniciando Postgres

```bash
$ docker-compose up
```

## Autenticação

Se fez necessário a utilização de um enum (auth.enum.ts) para passar os tokens estáticos de autenticação, cada um definido para um tipo de usuário (admin e student). Entendo que em um mundo ideal, teríamos a abstração desse dado, que seria salvo em um banco de dados, entretanto, como também não foi realizado um sistema de login, entendi ser a melhor solução para o momento