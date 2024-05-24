import express, { Express, Request, Response } from 'express'
import config from '@/config'

const port = config.basicConfig.serverPort
const app: Express = express()

app.get('/', (request, response: Response) => {
  response.type('text/plain')
  response.send('Hello World')
})

app.use((request: Request, response: Response) => {
  response.type('text/plain')
  response.status(404)
  response.send('Page is not found.')
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})
