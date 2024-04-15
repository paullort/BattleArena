import {Entity, model, property} from '@loopback/repository';

@model()
export class Logs extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Log_ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  game_ID: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'date',
  })
  date_time: string;

  @property({
    type: 'string',
    required: true,
  })
  player_ID: any;


  constructor(data?: Partial<Logs>) {
    super(data);
  }
}

export interface LogRelations {
  // describe navigational properties here
}

export type LogWithRelations = Logs & LogRelations;
