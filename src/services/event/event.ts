// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  eventDataValidator,
  eventPatchValidator,
  eventQueryValidator,
  eventResolver,
  eventExternalResolver,
  eventDataResolver,
  eventPatchResolver,
  eventQueryResolver
} from './event.schema'

import type { Application } from '../../declarations'
import { EventService, getOptions } from './event.class'

export const eventPath = 'event'
export const eventMethods: Array<keyof EventService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './event.class'
export * from './event.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const event = (app: Application) => {
  // Register our service on the Feathers application
  app.use(eventPath, new EventService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: eventMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(eventPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(eventExternalResolver), schemaHooks.resolveResult(eventResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(eventQueryValidator), schemaHooks.resolveQuery(eventQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(eventDataValidator), schemaHooks.resolveData(eventDataResolver)],
      patch: [schemaHooks.validateData(eventPatchValidator), schemaHooks.resolveData(eventPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [eventPath]: EventService
  }
}
