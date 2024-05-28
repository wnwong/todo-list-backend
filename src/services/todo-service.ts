import camelize from 'camelize-ts'
import { Pool } from 'pg'

export interface TodoItem {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

const getTodoList = async (db: Pool) => {
  const { rows } = await db.query<TodoItem>('SELECT * FROM public.todo_items WHERE deleted_at IS NULL ORDER BY id DESC')
  return rows.map((row) => camelize(row))
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

const updateTodoItem = async (db: Pool, name: string, id: number) => {
  const query = {
    name: 'update-todo',
    text: 'UPDATE public.todo_items SET name = $1 WHERE id = $2 AND deleted_at IS NULL',
    values: [name, id],
  }
  console.log(`UPDATE public.todo_items SET name = '${name}', WHERE id = ${id} AND deleted_at IS NULL`)
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
export { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem }
