import { createTodoSchema, updateTodoSchema } from './schema'

describe('todoSchema', () => {
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

  describe('updateTodoSchema', () => {
    it.each`
      input                                                                         | expected
      ${{ name: 'I go to school by bus' }}
      ${true}
      ${{ name: 'I am some really long text which exceed the allowed size limit' }}
      ${false}
    `('should returns $expected in updateTodoSchema check for $input', ({ input, expected }) => {
      expect(updateTodoSchema.safeParse(input).success).toBe(expected)
    })
  })
})
