import {Entity, model, property} from '@loopback/repository';

@model()
export class Players_Games extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  game_ID: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  player_ID: string;


  @property({
    type: 'number',
    required: true,
  })
  x_game: number;

  @property({
    type: 'number',
    required: true,
  })
  y_game: number;

  @property({
    type: 'string',
    required: true,
  })
  direction: string;

  @property({
    type: 'number',
    required: true,
  })
  hp: number;

  @property({
    type: 'boolean',
    default: null,
  })
  winner?: any;

  @property({
    type: 'number',
    default: 0,
  })
  xp_win?: number;

  @property({
    type: 'number',
    default: 0,
  })
  coins_win?: number;


  constructor(data?: Partial<Players_Games>) {
    super(data);
  }
}

export interface PlayersGamesRelations {
  // describe navigational properties here
}

export type PlayersGamesWithRelations = Players_Games & PlayersGamesRelations;
