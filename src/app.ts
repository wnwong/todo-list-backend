import cors from 'cors'
import express, { Express, json, Request, Response } from 'express'
import { Pool } from 'pg'
import httpLogger from 'pino-http'
import swaggerUi from 'swagger-ui-express'

import config from '@/config'
import { router } from '@/routes'
import { connect } from '@/services/postgres-service'
import { ERROR_MSG } from '@/utils/constants'
import logger from '@/utils/logger'

import swaggerSpec from './swagger'

const initServer = (db: Pool) => {
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

  return app
}
const initDB = (host: string, user: string, password: string, port: number, dbDatabase: string) => {
  return connect(host, port, user, password, dbDatabase)
}

const dbHost = config.dbConfig.host
const dbUser = config.dbConfig.user
const dbPassword = config.dbConfig.password
const dbPort = config.dbConfig.port
const dbDatabase = config.dbConfig.database
const host = config.basicConfig.serverHost
const port = config.basicConfig.serverPort

try {
  const db = initDB(dbHost, dbUser, dbPassword, dbPort, dbDatabase)
  const app = initServer(db)
  app.listen(port, () => {
    logger.info(`server is running on ${host}:${port}`)
  })
} catch (e) {
  if (e instanceof Error) {
    logger.error('error initdb', e.message)
  }
}
