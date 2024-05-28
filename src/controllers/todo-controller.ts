import { Request, Response } from 'express'
import { Pool } from 'pg'

import { API_RESPONSE_STATUS, ERROR_MSG } from '@/lib/constants'
import * as todoService from '@/services/todo-service'

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
    const todoList = await todoService.getTodoList(db)
    res.status(200)
    return res.json({ status: API_RESPONSE_STATUS.success, data: todoList })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400)
      return res.json({ status: API_RESPONSE_STATUS.failed, message: e.message })
    }
    res.status(500)
    return res.json({ status: API_RESPONSE_STATUS.failed, message: ERROR_MSG.unknownFailure })
  }
}

const createTodoItem = async (req: CreateTodoItemRequest<CreateTodoItem>, res: Response) => {
  const {
    app,
    body: { name },
  } = req
  const db = app.get('dbPool') as Pool
  try {
    await todoService.createTodoItem(db, name)
    res.status(201)
    return res.json({ status: API_RESPONSE_STATUS.success })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400)
      return res.json({ status: API_RESPONSE_STATUS.failed, message: e.message })
    }
    res.status(500)
    return res.json({ status: API_RESPONSE_STATUS.failed, message: ERROR_MSG.unknownFailure })
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
    const rowCount = await todoService.updateTodoItem(db, name, completed, Number(id))
    res.status(200)
    return res.json({ status: API_RESPONSE_STATUS.success, message: `updated ${rowCount} records` })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400)
      return res.json({ status: API_RESPONSE_STATUS.failed, message: e.message })
    }
    res.status(500)
    return res.json({ status: API_RESPONSE_STATUS.failed, message: ERROR_MSG.unknownFailure })
  }
}

const deleteTodoItem = async (req: Request, res: Response) => {
  const {
    app,
    params: { id },
  } = req
  const db = app.get('dbPool') as Pool
  try {
    await todoService.deleteTodoItem(db, Number(id))
    res.status(200)
    return res.json({ status: API_RESPONSE_STATUS.success })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400)
      return res.json({ status: API_RESPONSE_STATUS.failed, message: e.message })
    }
    res.status(500)
    return res.json({ status: API_RESPONSE_STATUS.failed, message: ERROR_MSG.unknownFailure })
  }
}

export { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem }
