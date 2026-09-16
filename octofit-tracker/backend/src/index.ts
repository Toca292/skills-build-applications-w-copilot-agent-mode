import app from './app.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'

const port = Number(process.env.PORT ?? 8000)

async function startServer() {
  await connectDatabase()
  const server = app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`)
  })

  const shutdown = async () => {
    server.close()
    await disconnectDatabase()
  }

  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
}

startServer().catch((error) => {
  console.error('Unable to start OctoFit Tracker API:', error)
  process.exitCode = 1
})