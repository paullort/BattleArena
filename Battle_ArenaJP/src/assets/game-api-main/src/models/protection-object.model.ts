import {Entity, model, property} from '@loopback/repository';
import {Objects} from './objects.model';

@model({
  name: 'Protection_objects', // Nom a la BBDD
})

export class ProtectionObjects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  protection_object_ID: string;

  @property({
    type: 'number',
    required: true,
  })
  HP_protection: number;

  @property({
    type: 'string',
    required: true,
  })
  from_power_type: string;


  constructor(data?: Partial<ProtectionObjects>) {
    super(data);
  }
}

export interface ProtectionObjectRelations {
  // describe navigational properties here
}

export type ProtectionObjectWithRelations = ProtectionObjects & ProtectionObjectRelations;
