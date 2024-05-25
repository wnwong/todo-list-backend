import { Router } from 'express'

import todo from './todo'

const router = Router()

router.use('/todos', todo)
export default router
