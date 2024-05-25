import { RequestHandler, Router } from 'express'

import { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from '@/controllers/todo-controller'

const router: Router = Router()

router.get('/', getTodoList as RequestHandler)

router.post('/', createTodoItem as RequestHandler)

router.put('/:id', updateTodoItem as RequestHandler)

router.delete('/:id', deleteTodoItem as RequestHandler)

export default router
