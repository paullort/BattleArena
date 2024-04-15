import {Entity, model, property} from '@loopback/repository';
import {Objects} from './objects.model';

@model({
  name: 'Movement_objects', // Nom a la BBDD
})

export class MovementObjects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  movement_object_ID: string;

  @property({
    type: 'number',
    required: true,
  })
  x: number;

  @property({
    type: 'number',
    required: true,
  })
  y: number;


  constructor(data?: Partial<MovementObjects>) {
    super(data);
  }
}

export interface MovementObjectRelations {
  // describe navigational properties here
}

export type MovementObjectWithRelations = MovementObjects & MovementObjectRelations;
