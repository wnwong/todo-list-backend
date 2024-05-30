import { Router } from 'express'

import { todoRouter } from './todo'

const v1Router: Router = Router()

v1Router.use('/todos', todoRouter)

export { v1Router }
