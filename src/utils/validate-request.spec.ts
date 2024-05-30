import { Request, Response } from 'express'
import { z } from 'zod'

import { validateData } from './validate-request'

const responseMockFn = jest.fn()

const mockResponse = {
  status: responseMockFn,
  json: responseMockFn,
} as unknown as Response

const mockNext = jest.fn()

describe('validate-request', () => {
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

    it('should return status 400 error with invalid request body', () => {
      const mockRequest = {
        body: { name: 'abcde' },
      } as Request
      const schema = z.object({
        name: z.string().max(4),
      })
      const middleware = validateData(schema)
      middleware(mockRequest, mockResponse, mockNext)
      expect(mockNext).toHaveBeenCalledTimes(0)
      expect(responseMockFn).toHaveBeenCalledWith(400)
    })

    it('should return status 500 error with unexpected error', () => {
      const mockRequest = {
        body: { name: 'abe' },
      } as Request
      const schema = z.object({
        name: z.string().max(4),
      })
      mockNext.mockImplementation(() => {
        throw new Error('Unexpected Error')
      })
      const middleware = validateData(schema)
      middleware(mockRequest, mockResponse, mockNext)
      expect(responseMockFn).toHaveBeenCalledWith(500)
    })
  })
})
