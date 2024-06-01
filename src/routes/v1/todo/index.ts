import { RequestHandler, Router } from 'express'

import { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from '@/controllers/v1/todo-controller'
import { validateData } from '@/utils/validate-request'

import { createTodoSchema, getTodoListSchema, updateTodoSchema } from './schema'

const todoRouter: Router = Router()

todoRouter.get('/', validateData(undefined, getTodoListSchema), getTodoList as RequestHandler)

todoRouter.post('/', validateData(createTodoSchema), createTodoItem as RequestHandler)

todoRouter.put('/:id', validateData(updateTodoSchema), updateTodoItem as RequestHandler)

todoRouter.delete('/:id', deleteTodoItem as RequestHandler)

export { todoRouter }
