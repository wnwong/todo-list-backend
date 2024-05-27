import { Request, Response } from 'express'
import { z } from 'zod'

import { validateData } from './validateRequest'

const responseMockFn = jest.fn()

const mockResponse = {
  status: responseMockFn,
  json: responseMockFn,
} as unknown as Response

const mockNext = jest.fn()

describe('validateRequest', () => {
  describe('validateData', () => {
    it('should proceed next with valid request body', () => {
      const mockRequest = {
        body: { name: 'abc' },
      } as Request
      const schema = z.object({
        name: z.string().max(4),
      })
      const middleware = validateData(schema)
      middleware(mockRequest, mockResponse, mockNext)
      expect(mockNext).toHaveBeenCalled()
      expect(responseMockFn).toHaveBeenCalledTimes(0)
    })

    it('should return error with invalid request body', () => {
      const mockRequest = {
        body: { name: 'abcde' },
      } as Request
      const schema = z.object({
        name: z.string().max(4),
      })
      const middleware = validateData(schema)
      middleware(mockRequest, mockResponse, mockNext)
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(responseMockFn).toHaveBeenCalledTimes(2)
    })
  })
})
