import { Request, Response } from 'express'
import { Pool } from 'pg'

import * as todoService from '@/services/todo-service'
import { API_RESPONSE_STATUS, ERROR_MSG } from '@/utils/constants'

interface CreateTodoItem {
  name: string
}

interface UpdateTodoItemName {
  name: string
}

interface UpdateTodoItemCompleted {
  completed: true
}

interface CreateTodoItemRequest<T> extends Request {
  body: T
}

interface UpdateTodoItemRequest<T> extends Request {
  body: T
}

const getTodoList = async (req: Request, res: Response) => {
  const {
    app,
    query: { page = 0, limit = 10 },
  } = req
  const db = app.get('dbPool') as Pool
  try {
    const { todoList, totalPages } = await todoService.getTodoList(db, Number(page), Number(limit))
    res.status(200)
    return res.json({ status: API_RESPONSE_STATUS.success, data: { todoList, totalPages } })
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

const updateTodoItemName = async (req: UpdateTodoItemRequest<UpdateTodoItemName>, res: Response) => {
  const {
    app,
    params: { id },
  } = req
  const { name } = req.body
  const db = app.get('dbPool') as Pool
  try {
    const rowCount = await todoService.updateTodoItemName(db, name, Number(id))
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

const updateTodoItemCompleted = async (req: UpdateTodoItemRequest<UpdateTodoItemCompleted>, res: Response) => {
  const {
    app,
    params: { id },
  } = req
  const { completed } = req.body
  const db = app.get('dbPool') as Pool
  try {
    const rowCount = await todoService.updateTodoItemCompleted(db, completed, Number(id))
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

export { createTodoItem, deleteTodoItem, getTodoList, updateTodoItemCompleted, updateTodoItemName }
