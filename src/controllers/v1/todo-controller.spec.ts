import { Request, Response } from 'express'

import { createTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from '@/controllers/v1/todo-controller'
import * as todoService from '@/services/todo-service'
import { mockTodoList } from '@/tests/mockData/todo-list'
import { API_RESPONSE_STATUS, ERROR_MSG } from '@/utils/constants'
const responseMockFn = jest.fn()

const mockResponse = {
  status: responseMockFn,
  json: responseMockFn,
} as unknown as Response

jest.mock<typeof todoService>('@/services/todo-service', () => {
  return {
    getTodoList: jest.fn(),
    createTodoItem: jest.fn(),
    updateTodoItem: jest.fn(),
    deleteTodoItem: jest.fn(),
  }
})

describe('todo-controller', () => {
  describe('getTodoList', () => {
    it('should return status 200 with todo list', async () => {
      const mockRequest = {
        app: { get: jest.fn() },
      } as unknown as Request
      ;(todoService.getTodoList as jest.Mock).mockImplementation(() => {
        return mockTodoList
      }),
        await getTodoList(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenCalledWith(200)
    })

    it('should return status 400', async () => {
      const mockRequest = {
        app: { get: jest.fn() },
      } as unknown as Request
      const errorMsg = 'Unexpected error'
      ;(todoService.getTodoList as jest.Mock).mockImplementation(() => {
        throw new Error(errorMsg)
      }),
        await getTodoList(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 400)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, { status: API_RESPONSE_STATUS.failed, message: errorMsg })
    })

    it('should return status 500', async () => {
      const mockRequest = {
        app: { get: jest.fn() },
      } as unknown as Request
      ;(todoService.getTodoList as jest.Mock).mockImplementation(() => {
        throw 'something'
      }),
        await getTodoList(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 500)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.failed,
        message: ERROR_MSG.unknownFailure,
      })
    })
  })

  describe('createTodoItem', () => {
    const mockRequest = {
      app: { get: jest.fn() },
      body: { name: 'new todo item' },
    } as unknown as Request
    it('should return status 201 when item created successfully', async () => {
      ;(todoService.createTodoItem as jest.Mock).mockImplementation(() => {
        return
      }),
        await createTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 201)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, { status: API_RESPONSE_STATUS.success })
    })

    it('should return status 400', async () => {
      const errorMsg = 'Unexpected error'
      ;(todoService.createTodoItem as jest.Mock).mockImplementation(() => {
        throw new Error(errorMsg)
      }),
        await createTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 400)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, { status: API_RESPONSE_STATUS.failed, message: errorMsg })
    })

    it('should return status 500', async () => {
      ;(todoService.createTodoItem as jest.Mock).mockImplementation(() => {
        throw 'something'
      }),
        await createTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 500)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.failed,
        message: ERROR_MSG.unknownFailure,
      })
    })
  })

  describe('updateTodoItem', () => {
    const mockRequest = {
      app: { get: jest.fn() },
      body: { name: 'new todo item' },
      params: { id: 2 },
    } as unknown as Request

    it('should return status 200 when item updated successfully', async () => {
      const rowCount = 2
      ;(todoService.updateTodoItem as jest.Mock).mockImplementation(() => {
        return rowCount
      }),
        await updateTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 200)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.success,
        message: `updated ${rowCount} records`,
      })
    })

    it('should return status 400', async () => {
      const errorMsg = 'Unexpected error'
      ;(todoService.updateTodoItem as jest.Mock).mockImplementation(() => {
        throw new Error(errorMsg)
      }),
        await updateTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 400)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, { status: API_RESPONSE_STATUS.failed, message: errorMsg })
    })

    it('should return status 500', async () => {
      ;(todoService.updateTodoItem as jest.Mock).mockImplementation(() => {
        throw 'something'
      }),
        await updateTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 500)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.failed,
        message: ERROR_MSG.unknownFailure,
      })
    })
  })

  describe('deleteTodoItem', () => {
    const mockRequest = {
      app: { get: jest.fn() },
      params: { id: 2 },
    } as unknown as Request

    it('should return status 200 when item updated successfully', async () => {
      ;(todoService.deleteTodoItem as jest.Mock).mockImplementation(() => {
        return
      }),
        await deleteTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 200)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.success,
      })
    })

    it('should return status 400', async () => {
      const errorMsg = 'Unexpected error'
      ;(todoService.deleteTodoItem as jest.Mock).mockImplementation(() => {
        throw new Error(errorMsg)
      }),
        await deleteTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 400)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, { status: API_RESPONSE_STATUS.failed, message: errorMsg })
    })

    it('should return status 500', async () => {
      ;(todoService.deleteTodoItem as jest.Mock).mockImplementation(() => {
        throw 'something'
      }),
        await deleteTodoItem(mockRequest, mockResponse)
      expect(responseMockFn).toHaveBeenNthCalledWith(1, 500)
      expect(responseMockFn).toHaveBeenNthCalledWith(2, {
        status: API_RESPONSE_STATUS.failed,
        message: ERROR_MSG.unknownFailure,
      })
    })
  })
})
