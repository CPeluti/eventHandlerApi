// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Property, PropertyData, PropertyPatch, PropertyQuery } from './property.schema'

export type { Property, PropertyData, PropertyPatch, PropertyQuery }

export interface PropertyParams extends MongoDBAdapterParams<PropertyQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class PropertyService<ServiceParams extends Params = PropertyParams> extends MongoDBService<
  Property,
  PropertyData,
  PropertyParams,
  PropertyPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('property'))
  }
}
