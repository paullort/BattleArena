import {Entity, hasMany, model, property} from '@loopback/repository';
import {Attacks} from './attack.model';

@model()
export class Players extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  player_ID: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  img: string;

  @property({
    type: 'number',
    default: 0,
  })
  xp?: number;

  @property({
    type: 'number',
    default: 0,
  })
  level?: number;

  @property({
    type: 'number',
    default: 0,
  })
  coins?: number;

  @property({
    type: 'string',
    required:true,
  })
  token?: string;

  @hasMany(() => Attacks, {keyTo: 'player_ID'})
  attacks?: Attacks[];


  constructor(data?: Partial<Players>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Players & PlayerRelations;
