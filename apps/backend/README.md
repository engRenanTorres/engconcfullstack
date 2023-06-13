## Teste para a entrevista da Licitar Digital


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Funcionalidades do Backend:
[] Implementar uma API que permita a criação de disputas e lances.
[] As disputas devem iniciar automaticamente após o término da anterior, com um limite de tempo de 10 minutos para cada disputa.

### Requisitos do teste:
[] Entrega em 6 dias corridos;
[X] Desenvolver utilizando Nestjs e TypeScript.
[X] Implementar autenticação JWT para permitir apenas usuários logados acessem a aplicação
[X] Usar um banco de dados SQL para armazenar dados do aplicativo. (Opcional)
[] Implementar WebSocket para atualização em tempo real. (Opcional)
[] Usar Class Validator para validar dados de entrada de requisições. (Opcional)

## Installation

```bash
#Option 1
$ docker-compose up

#Option 2
#config mysql or mariadb
#config .env file using .env.exemple as exemple

$ npm i

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm i
$ npm run test

# e2e tests
Está precisando subir o dbtest em separado
$ docker-compose up dbtest
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Renan Torres](https://www.linkedin.com/in/renan-torres-3ba43560/)

