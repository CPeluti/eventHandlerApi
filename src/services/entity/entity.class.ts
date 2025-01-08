// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Entity, EntityData, EntityPatch, EntityQuery } from './entity.schema'

export type { Entity, EntityData, EntityPatch, EntityQuery }

export interface EntityParams extends MongoDBAdapterParams<EntityQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class EntityService<ServiceParams extends Params = EntityParams> extends MongoDBService<
  Entity,
  EntityData,
  EntityParams,
  EntityPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('entity'))
  }
}
