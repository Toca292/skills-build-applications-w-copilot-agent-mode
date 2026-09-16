import { Router } from 'express'
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js'

export const apiRouter = Router()

function registerCrudRoutes(path: string, resource: any) {
  apiRouter.get(path, async (_request, response) => {
    response.json(await resource.find().sort({ createdAt: -1 }))
  })

  apiRouter.post(path, async (request, response) => {
    const created = await resource.create(request.body)
    response.status(201).json(created)
  })

  apiRouter.get(`${path}/:id`, async (request, response) => {
    const item = await resource.findById(request.params.id)
    if (!item) {
      response.status(404).json({ error: 'Resource not found' })
      return
    }
    response.json(item)
  })

  apiRouter.patch(`${path}/:id`, async (request, response) => {
    const item = await resource.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    })
    if (!item) {
      response.status(404).json({ error: 'Resource not found' })
      return
    }
    response.json(item)
  })

  apiRouter.delete(`${path}/:id`, async (request, response) => {
    const item = await resource.findByIdAndDelete(request.params.id)
    if (!item) {
      response.status(404).json({ error: 'Resource not found' })
      return
    }
    response.status(204).send()
  })
}

registerCrudRoutes('/users', User)
registerCrudRoutes('/teams', Team)
registerCrudRoutes('/activities', Activity)
registerCrudRoutes('/leaderboard', LeaderboardEntry)
registerCrudRoutes('/workouts', Workout)