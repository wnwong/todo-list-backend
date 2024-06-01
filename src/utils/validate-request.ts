import { NextFunction, Request, Response } from 'express'
import { z, ZodError, ZodIssue } from 'zod'

import { ERROR_MSG } from '@/utils/constants'

const validateData = (bodySchema?: z.ZodObject<any, any>, paramsSchema?: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodySchema) {
        bodySchema.parse(req.body)
      }
      if (paramsSchema) {
        paramsSchema.parse(req.params)
      }
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }))
        res.status(400)
        res.json({ error: ERROR_MSG.invalidData, details: errorMessages })
      } else {
        res.status(500)
        res.json({ error: ERROR_MSG.invalidData })
      }
    }
  }
}

export { validateData }
