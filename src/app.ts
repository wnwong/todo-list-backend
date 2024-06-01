import cors from 'cors'
import express, { Express, json, Request, Response } from 'express'
import { Pool } from 'pg'
import pino from 'pino'
import httpLogger from 'pino-http'
import swaggerUi from 'swagger-ui-express'

import config from '@/config'
import { router } from '@/routes'
import { connect } from '@/services/postgres-service'
import { ERROR_MSG } from '@/utils/constants'

import swaggerSpec from './swagger'

const logger = pino({ name: 'server start' })
const initServer = (port: number, db: Pool) => {
  const app: Express = express()
  app.use(httpLogger())
  app.use(cors())
  app.use(json())
  app.set('dbPool', db)
  app.set('logger', logger)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.use('/api', router)

  app.use((_req: Request, res: Response) => {
    res.status(404)
    return res.json({ success: false, data: { message: ERROR_MSG.invalidApiCall } })
  })

  const serverHost = config.basicConfig.serverHost
  app.listen(port, () => {
    logger.info(`server is running on ${serverHost}:${port}`)
  })
}
const initDB = (host: string, user: string, password: string, port: number, dbDatabase: string) => {
  return connect(host, port, user, password, dbDatabase)
}

const dbHost = config.dbConfig.host
const dbUser = config.dbConfig.user
const dbPassword = config.dbConfig.password
const dbPort = config.dbConfig.port
const dbDatabase = config.dbConfig.database
const port = config.basicConfig.serverPort

try {
  const db = initDB(dbHost, dbUser, dbPassword, dbPort, dbDatabase)
  initServer(port, db)
} catch (e) {
  if (e instanceof Error) {
    logger.error('error initdb', e.message)
  }
}
