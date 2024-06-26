import { createTodoSchema, getTodoListSchema, updateTodoCompletedSchema, updateTodoNameSchema } from './schema'

describe('todoSchema', () => {
  describe('getTodoListSchema', () => {
    it.each`
      input                               | expected
      ${{ page: 2, limit: 20 }}
      ${true}
      ${{ page: -2, limit: -20 }}
      ${false}
      ${{ page: 'peter', limit: 'john' }}
      ${false}
      ${{ page: 2, limit: 'john' }}
      ${false}
      ${{ page: 'peter', limit: 1 }}
      ${false}
    `('should returns $expected in getTodoListSchema check for $input', ({ input, expected }) => {
      expect(getTodoListSchema.safeParse(input).success).toBe(expected)
    })
  })

  describe('createTodoSchema', () => {
    it.each`
      input                                                                         | expected
      ${{ name: 'I go to school by bus' }}
      ${true}
      ${{ name: 'I am some really long text which exceed the allowed size limit' }}
      ${false}
    `('should returns $expected in createTodoSchema check for $input', ({ input, expected }) => {
      expect(createTodoSchema.safeParse(input).success).toBe(expected)
    })
  })

  describe('updateTodoNameSchema', () => {
    it.each`
      input                                                                         | expected
      ${{ name: 'I go to school by bus' }}
      ${true}
      ${{ name: 'I am some really long text which exceed the allowed size limit' }}
      ${false}
    `('should returns $expected in updateTodoNameSchema check for $input', ({ input, expected }) => {
      expect(updateTodoNameSchema.safeParse(input).success).toBe(expected)
    })
  })

  describe('updateTodoCompletedSchema', () => {
    it.each`
      input                   | expected
      ${{ completed: true }}
      ${true}
      ${{ completed: false }}
      ${true}
      ${{ unknown: 'abc' }}
      ${false}
    `('should returns $expected in updateTodoCompletedSchema check for $input', ({ input, expected }) => {
      expect(updateTodoCompletedSchema.safeParse(input).success).toBe(expected)
    })
  })
})
