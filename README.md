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

### Start Postgres Database

```
docker-compose up db
```

### Database Schema Initial Load

Execute the below sql with any DB client

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
npm test
```

## APIs

### Get Todo List

```http
GET /v1/todos
```

### Create Todo Item

```http
POST /v1/todos
```

| Body   | Type     | Validation           |
| :----- | :------- | :------------------- |
| `name` | `string` | size <=50 characters |

### Update Todo Item

```http
PUT /v1/todos/:id
```

| Body   | Type     | Validation           |
| :----- | :------- | :------------------- |
| `name` | `string` | size <=50 characters |

### Delete Todo Item

```http
DELETE /v1/todos/:id
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
