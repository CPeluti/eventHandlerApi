// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { PropertyService } from './property.class'
import { entitySchema } from '../entity/entity'

// Main data model schema
export const propertySchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    status: Type.Boolean(),
    entity: Type.Ref(entitySchema),
    entityId: Type.String({objectid: true}),
    createdAt: Type.Number(),
    updatedAt: Type.Number()
  },
  { $id: 'Property', additionalProperties: false }
)
export type Property = Static<typeof propertySchema>
export const propertyValidator = getValidator(propertySchema, dataValidator)
export const propertyResolver = resolve<Property, HookContext<PropertyService>>({
  entity: virtual(async (property, context)=>{
    return context.app.service("entity").get(property.entityId)
  })
})

export const propertyExternalResolver = resolve<Property, HookContext<PropertyService>>({})

// Schema for creating new entries
export const propertyDataSchema = Type.Pick(propertySchema, ['name', 'status', 'entityId'], {
  $id: 'PropertyData'
})
export type PropertyData = Static<typeof propertyDataSchema>
export const propertyDataValidator = getValidator(propertyDataSchema, dataValidator)
export const propertyDataResolver = resolve<Property, HookContext<PropertyService>>({
  createdAt: async () => {
    return Date.now()
  },
  updatedAt: async () => {
    return Date.now()
  },
})

// Schema for updating existing entries
export const propertyPatchSchema = Type.Partial(propertySchema, {
  $id: 'PropertyPatch'
})
export type PropertyPatch = Static<typeof propertyPatchSchema>
export const propertyPatchValidator = getValidator(propertyPatchSchema, dataValidator)
export const propertyPatchResolver = resolve<Property, HookContext<PropertyService>>({
  updatedAt: async () => {
    return Date.now()
  }
})

// Schema for allowed query properties
export const propertyQueryProperties = Type.Pick(propertySchema, ['_id', 'name', 'entityId', 'createdAt', 'updatedAt', 'entity'])
export const propertyQuerySchema = Type.Intersect(
  [
    querySyntax(propertyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type PropertyQuery = Static<typeof propertyQuerySchema>
export const propertyQueryValidator = getValidator(propertyQuerySchema, queryValidator)
export const propertyQueryResolver = resolve<PropertyQuery, HookContext<PropertyService>>({})
