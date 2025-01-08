// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { EntityService } from './entity.class'

// Main data model schema
export const entitySchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    type: Type.String()
  },
  { $id: 'Entity', additionalProperties: false }
)
export type Entity = Static<typeof entitySchema>
export const entityValidator = getValidator(entitySchema, dataValidator)
export const entityResolver = resolve<Entity, HookContext<EntityService>>({})

export const entityExternalResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for creating new entries
export const entityDataSchema = Type.Pick(entitySchema, ['name','type'], {
  $id: 'EntityData'

})
export type EntityData = Static<typeof entityDataSchema>
export const entityDataValidator = getValidator(entityDataSchema, dataValidator)
export const entityDataResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for updating existing entries
export const entityPatchSchema = Type.Partial(entitySchema, {
  $id: 'EntityPatch'
})
export type EntityPatch = Static<typeof entityPatchSchema>
export const entityPatchValidator = getValidator(entityPatchSchema, dataValidator)
export const entityPatchResolver = resolve<Entity, HookContext<EntityService>>({})

// Schema for allowed query properties
export const entityQueryProperties = Type.Pick(entitySchema, ['_id', 'name'])
export const entityQuerySchema = Type.Intersect(
  [
    querySyntax(entityQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type EntityQuery = Static<typeof entityQuerySchema>
export const entityQueryValidator = getValidator(entityQuerySchema, queryValidator)
export const entityQueryResolver = resolve<EntityQuery, HookContext<EntityService>>({})
