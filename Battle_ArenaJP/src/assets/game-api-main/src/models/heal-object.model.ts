import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'Heal_objects', // Nom a la BBDD
})

export class HealObjects extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  heal_object_ID: string;

  @property({
    type: 'number',
    required: true,
  })
  HP_increase: number;


  constructor(data?: Partial<HealObjects>) {
    super(data);
  }
}

export interface HealObjectRelations {
  // describe navigational properties here
}

export type HealObjectWithRelations = HealObjects & HealObjectRelations;
