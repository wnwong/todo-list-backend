import { z } from 'zod'

const getTodoListSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
})

const createTodoSchema = z.object({
  name: z.string().max(50),
})

const updateTodoNameSchema = z.object({
  name: z.string().max(50),
})

const updateTodoCompletedSchema = z.object({
  completed: z.boolean(),
})

export { createTodoSchema, getTodoListSchema, updateTodoCompletedSchema, updateTodoNameSchema }
