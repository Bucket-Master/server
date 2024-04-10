import fastify from 'fastify'
import { UserRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { TaskRoutes } from './http/controllers/tasks/routes'

export const app = fastify()

app.register(UserRoutes)
app.register(TaskRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
