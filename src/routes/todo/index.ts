import { RequestHandler, Router } from 'express'

import { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from '@/controllers/todo-controller'
import { validateData } from '@/utils/validateRequest'

import { createTodoSchema, updateTodoSchema } from './schema'

const router: Router = Router()

router.get('/', getTodoList as RequestHandler)

router.post('/', validateData(createTodoSchema), createTodoItem as RequestHandler)

router.put('/:id', validateData(updateTodoSchema), updateTodoItem as RequestHandler)

router.delete('/:id', deleteTodoItem as RequestHandler)

export default router
