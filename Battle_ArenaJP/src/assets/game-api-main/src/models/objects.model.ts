import {Entity, model, property} from '@loopback/repository';
import { belongsTo } from '@loopback/repository';
import { HealObjects } from './heal-object.model';
import { MovementObjects } from './movement-object.model';
import { IncreaseObjects } from './increase-object.model';
import { ProtectionObjects } from './protection-object.model';

@model()

export class Objects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  object_ID: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  level_needed: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  img_url: string;

  
  @belongsTo(() => HealObjects, {name: 'object_ID'}) //nom a object
  heal_object_ID: string; //nom a heal_object

  @belongsTo(() => MovementObjects, {name: 'object_ID'}) //nom a object
  movement_object_ID: string; //nom a heal_object

  @belongsTo(() => IncreaseObjects, {name: 'object_ID'}) //nom a object
  increase_object_ID: string; //nom a heal_object

  @belongsTo(() => ProtectionObjects, {name: 'object_ID'}) //nom a object
  protection_object_ID: string; //nom a heal_object

  constructor(data?: Partial<Objects>) {
    super(data);
  }
}


export interface ObjectRelations {
  // describe navigational properties here
}

export type ObjectWithRelations = Objects & ObjectRelations;
