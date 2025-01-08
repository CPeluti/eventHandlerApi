import { event } from './event/event'
import { property } from './property/property'
import { entity } from './entity/entity'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(event)
  app.configure(property)
  app.configure(entity)
  // All services will be registered here
}
