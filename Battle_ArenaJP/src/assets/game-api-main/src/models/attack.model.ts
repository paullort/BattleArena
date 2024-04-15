import {Entity, model, property} from '@loopback/repository';

@model()
export class Attacks extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  attack_ID: string;

  @property({
    type: 'string',
    required: true,
  })
  positions: string;

  @property({
    type: 'string',
    required: true,
  })
  img: string;

  @property({
    type: 'number',
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  power: number;

  @property({
    type: 'number',
  })
  level_needed: number;

  @property({
    type: 'boolean',
  })
  equipped: boolean;

  @property({
    type: 'boolean',
  })
  on_sale: boolean;

  @property({
    type: 'string',
    required:true,
  })
  player_ID: string;


  constructor(data?: Partial<Attacks>) {
    super(data);
  }
}

export interface AttackRelations {
  // describe navigational properties here
}

export type AttackWithRelations = Attacks & AttackRelations;
