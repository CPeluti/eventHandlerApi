// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Event, EventData, EventPatch, EventQuery } from './event.schema'

export type { Event, EventData, EventPatch, EventQuery }

export interface EventParams extends MongoDBAdapterParams<EventQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class EventService<ServiceParams extends Params = EventParams> extends MongoDBService<
  Event,
  EventData,
  EventParams,
  EventPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('event'))
  }
}
