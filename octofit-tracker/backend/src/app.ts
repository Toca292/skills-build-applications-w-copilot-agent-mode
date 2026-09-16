import cors from 'cors'
import express from 'express'
import { apiRouter } from './routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use('/api', apiRouter)

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' })
})

export default app