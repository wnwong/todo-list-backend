# Todo List Backend

This is the backend service for a Todo List application, built using Node.js, Express, and PostgreSQL.

## Prerequisites

- Docker
- Docker Compose
- node >=20

## First time setup

### Install dependency

```
npm install
```

### Environmental Variables

```
cp .env.shcema .env
```

### Start Postgres Database

```
docker-compose up db
```

### Database Schema Migration

Execute the below sql with a postgres DB client

```
database/create_todo_items_table.sql
```

### Start Todo Backend Service

```
docker-compose up app
```

## Subsequent Project Setup with Docker

```
docker-compose up

or

docker-compose up -d
```

## Testing

This project uses Jest for unit testing. To run the tests, execute:

```
npm run test

or

npm run test:coverage
```

## API Doc

```
http://{server host}:{server port}/api-doc
```

## Key Dependencies

- [express](https://github.com/expressjs/express)
- [eslint](https://github.com/eslint/eslint)
- [typescript](https://github.com/microsoft/TypeScript/issues)
- [zod](https://github.com/colinhacks/zod)
- [pg](https://github.com/brianc/node-postgres)
- [husky](https://github.com/typicode/husky)
- [prettier](https://github.com/prettier/prettier)
- [jest](https://github.com/jestjs/jest)
- [pino](https://github.com/pinojs/pino)
- [swagger](https://github.com/swagger-api/swagger-ui)
