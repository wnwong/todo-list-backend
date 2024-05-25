import { Request, Response } from 'express'
import { Pool } from 'pg'

import * as TodoService from '@/services/todo-service'

interface CreateTodoItem {
  name: string
}

interface UpdateTodoItem {
  name: string
  completed: boolean
}

interface CreateTodoItemRequest<T> extends Request {
  body: T
}

interface UpdateTodoItemRequest<T> extends Request {
  body: T
}

const getTodoList = async (req: Request, res: Response) => {
  const { app } = req
  const db = app.get('dbPool') as Pool
  try {
    await TodoService.getTodoList(db)
    return res.json({ status: 'success' })
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      return res.json({ status: 'failed', message: e.message })
    }
    return res.json({ status: 'failed', message: 'unknown failure' })
  }
}

const createTodoItem = async (req: CreateTodoItemRequest<CreateTodoItem>, res: Response) => {
  const { app } = req
  const { name } = req.body
  const db = app.get('dbPool') as Pool
  try {
    await TodoService.createTodoItem(db, name)
    res.status(201)
    return res.json({ status: 'success' })
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      return res.json({ status: 'failed', message: e.message })
    }
    return res.json({ status: 'failed', message: 'unknown failure' })
  }
}

const updateTodoItem = async (req: UpdateTodoItemRequest<UpdateTodoItem>, res: Response) => {
  const {
    app,
    params: { id },
  } = req
  const { name, completed } = req.body
  const db = app.get('dbPool') as Pool
  try {
    const rowCount = await TodoService.updateTodoItem(db, name, completed, Number(id))
    return res.json({ status: 'success', message: `updated ${rowCount} records` })
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      return res.json({ status: 'failed', message: e.message })
    }
    return res.json({ status: 'failed', message: 'unknown failure' })
  }
}

const deleteTodoItem = async (req: Request, res: Response) => {
  const {
    app,
    params: { id },
  } = req
  const db = app.get('dbPool') as Pool
  try {
    await TodoService.deleteTodoItem(db, Number(id))
    return res.json({ status: 'success' })
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      return res.json({ status: 'failed', message: e.message })
    }
    return res.json({ status: 'failed', message: 'unknown failure' })
  }
}

export { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem }
