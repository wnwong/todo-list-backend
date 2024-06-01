import camelize from 'camelize-ts'
import { Pool } from 'pg'

export interface TodoItem {
  id: number
  name: string
}

export interface TodoItemCounts {
  count: number
}

const getTodoList = async (db: Pool, page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit
  const countQuery = {
    name: 'count-todo',
    text: 'SELECT count(*) AS count FROM public.todo_items WHERE deleted_at IS NULL AND completed = FALSE',
    values: [],
  }
  const { rows: countRows } = await db.query<TodoItemCounts>(countQuery)
  const query = {
    name: 'query-todo',
    text: 'SELECT id, name FROM public.todo_items WHERE deleted_at IS NULL AND completed = FALSE ORDER BY id DESC LIMIT $1 OFFSET $2',
    values: [limit, offset],
  }
  const { rows } = await db.query<TodoItem>(query)

  const totalPages = countRows[0].count ? Math.ceil(countRows[0].count / limit) : 1
  return {
    todoList: rows.map((row) => camelize(row)),
    totalPages,
  }
}

const createTodoItem = async (db: Pool, name: string) => {
  const query = {
    name: 'insert-todo',
    text: 'INSERT INTO public.todo_items(name) VALUES ($1)',
    values: [name],
  }
  const { rowCount } = await db.query<TodoItem>(query)
  return rowCount
}

const updateTodoItemName = async (db: Pool, name: string, id: number) => {
  const query = {
    name: 'update-todo-name',
    text: 'UPDATE public.todo_items SET name = $1 WHERE id = $2 AND deleted_at IS NULL',
    values: [name, id],
  }
  const { rowCount } = await db.query<TodoItem>(query)
  return rowCount
}

const updateTodoItemCompleted = async (db: Pool, completed: boolean, id: number) => {
  const query = {
    name: 'update-todo-completed',
    text: 'UPDATE public.todo_items SET completed = $1 WHERE id = $2 AND deleted_at IS NULL',
    values: [completed, id],
  }
  const { rowCount } = await db.query<TodoItem>(query)
  return rowCount
}

const deleteTodoItem = async (db: Pool, id: number) => {
  const query = {
    name: 'delete-todo',
    text: 'UPDATE public.todo_items SET deleted_at=now() WHERE id = $1',
    values: [id],
  }
  const { rowCount } = await db.query<TodoItem>(query)
  return rowCount
}
export { createTodoItem, deleteTodoItem, getTodoList, updateTodoItemCompleted, updateTodoItemName }
