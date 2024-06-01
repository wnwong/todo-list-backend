import { z } from 'zod'

const getTodoListSchema = z.object({
  page: z.coerce.number().positive().default(1),
  limit: z.coerce.number().positive().default(10),
})

const createTodoSchema = z.object({
  name: z.string().max(50),
})

const updateTodoSchema = z.object({
  name: z.string().max(50),
})

export { createTodoSchema, getTodoListSchema, updateTodoSchema }
