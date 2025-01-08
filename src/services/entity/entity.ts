// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  entityDataValidator,
  entityPatchValidator,
  entityQueryValidator,
  entityResolver,
  entityExternalResolver,
  entityDataResolver,
  entityPatchResolver,
  entityQueryResolver
} from './entity.schema'

import type { Application } from '../../declarations'
import { EntityService, getOptions } from './entity.class'

export const entityPath = 'entity'
export const entityMethods: Array<keyof EntityService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './entity.class'
export * from './entity.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const entity = (app: Application) => {
  // Register our service on the Feathers application
  app.use(entityPath, new EntityService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: entityMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(entityPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(entityExternalResolver), schemaHooks.resolveResult(entityResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(entityQueryValidator), schemaHooks.resolveQuery(entityQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(entityDataValidator), schemaHooks.resolveData(entityDataResolver)],
      patch: [schemaHooks.validateData(entityPatchValidator), schemaHooks.resolveData(entityPatchResolver)],
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
    [entityPath]: EntityService
  }
}
