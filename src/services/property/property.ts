// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  propertyDataValidator,
  propertyPatchValidator,
  propertyQueryValidator,
  propertyResolver,
  propertyExternalResolver,
  propertyDataResolver,
  propertyPatchResolver,
  propertyQueryResolver
} from './property.schema'

import type { Application } from '../../declarations'
import { PropertyService, getOptions } from './property.class'

export const propertyPath = 'property'
export const propertyMethods: Array<keyof PropertyService> = ['find', 'get', 'create', 'patch', 'remove']

export * from './property.class'
export * from './property.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const property = (app: Application) => {
  // Register our service on the Feathers application
  app.use(propertyPath, new PropertyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: propertyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(propertyPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(propertyExternalResolver),
        schemaHooks.resolveResult(propertyResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(propertyQueryValidator),
        schemaHooks.resolveQuery(propertyQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(propertyDataValidator),
        schemaHooks.resolveData(propertyDataResolver)
      ],
      patch: [
        schemaHooks.validateData(propertyPatchValidator),
        schemaHooks.resolveData(propertyPatchResolver)
      ],
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
    [propertyPath]: PropertyService
  }
}
