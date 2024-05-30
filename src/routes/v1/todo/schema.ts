import { z } from 'zod'

const createTodoSchema = z.object({
  name: z.string().max(50),
})

const updateTodoSchema = z.object({
  name: z.string().max(50),
})

export { createTodoSchema, updateTodoSchema }
