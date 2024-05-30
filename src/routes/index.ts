import express, { Router } from 'express'

import { v1Router } from '@/routes/v1'

const router: Router = express.Router()

router.use('/v1', v1Router)

export { router }
