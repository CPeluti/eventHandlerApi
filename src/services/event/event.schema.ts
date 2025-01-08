// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax, StringEnum } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EventService } from './event.class'
import { property } from '../property/property'

// Main data model schema
const PayloadType = Type.Array(Type.Object({
  document: Type.String(),
  property: Type.String(),
  newValue: Type.Boolean()
}))

export const eventSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    attribute: StringEnum(["success", "failed", "running", "idle"]),
    controllerType: StringEnum(["global", "local", "both"]),
    target: Type.String(),
    payload: Type.Object({
        type: StringEnum(["proxy", "database"]),
        content: Type.Union([Type.String(), PayloadType]) 
    }),
    createdAt: Type.Number()
  },
  { $id: 'Event', additionalProperties: false }
)
export type Event = Static<typeof eventSchema>
export const eventValidator = getValidator(eventSchema, dataValidator)
export const eventResolver = resolve<Event, HookContext<EventService>>({})

export const eventExternalResolver = resolve<Event, HookContext<EventService>>({})

// Schema for creating new entries

export const eventDataSchema = Type.Pick(eventSchema, ['attribute','controllerType','target','payload'], {
  $id: 'EventData'
})
export type EventData = Static<typeof eventDataSchema>
export const eventDataValidator = getValidator(eventDataSchema, dataValidator)
export const eventDataResolver = resolve<Event, HookContext<EventService>>({
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const eventPatchSchema = Type.Partial(eventSchema, {
  $id: 'EventPatch'
})
export type EventPatch = Static<typeof eventPatchSchema>
export const eventPatchValidator = getValidator(eventPatchSchema, dataValidator)
export const eventPatchResolver = resolve<Event, HookContext<EventService>>({})

// Schema for allowed query properties
export const eventQueryProperties =  Type.Pick(eventSchema, ['_id','attribute','controllerType','target','payload'])
export const eventQuerySchema = Type.Intersect(
  [
    querySyntax(eventQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EventQuery = Static<typeof eventQuerySchema>
export const eventQueryValidator = getValidator(eventQuerySchema, queryValidator)
export const eventQueryResolver = resolve<EventQuery, HookContext<EventService>>({})
