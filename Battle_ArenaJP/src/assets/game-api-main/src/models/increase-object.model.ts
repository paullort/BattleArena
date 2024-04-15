import {Entity, model, property} from '@loopback/repository';


@model({
  name: 'Increase_objects', // Nom a la BBDD
})

export class IncreaseObjects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  increase_object_ID: string;

  @property({
    type: 'number',
    required: true,
  })
  power_increase: number;

  @property({
    type: 'string',
    required: true,
  })
  power_type: string;


  constructor(data?: Partial<IncreaseObjects>) {
    super(data);
  }
}

export interface IncreaseObjectRelations {
  // describe navigational properties here
}

export type IncreaseObjectWithRelations = IncreaseObjects & IncreaseObjectRelations;
