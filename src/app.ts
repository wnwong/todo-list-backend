import express, { Express, json, Request, Response } from 'express'
import { Pool } from 'pg'

import config from '@/config'
import { connect } from '@/services/postgres-service'

import routes from './routes'

const initServer = (port: number, db: Pool) => {
  const app: Express = express()
  app.use(json())

  app.set('dbPool', db)

  app.use('/v1', routes)

  app.use((_req: Request, res: Response) => {
    res.status(404)
    return res.json({ success: false, data: { message: 'Invalid API Call' } })
  })

  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
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
    console.error('error initdb', e.message)
  }
}
