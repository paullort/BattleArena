import {Entity, model, property, hasMany} from '@loopback/repository';
import {Players_Games} from './players-games.model';

@model()
export class Games extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  game_ID: string;

  @property({
    type: 'number',
    required: true,
  })
  size: number;

  @property({
    type: 'string'
  })
  creation_date: string;

  @property({
    type: 'boolean',
    default: false,
  })
  finished?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  HP_max: number;

  @property({
    type: 'boolean',
    default: false,
  })
  start?: boolean;


  @hasMany(() => Players_Games, {keyTo: 'game_ID', name: "players_games"})
  players_games?: Players_Games[];

  constructor(data?: Partial<Games>) {
    super(data);
  }
}

export interface GameRelations {
  // describe navigational properties here
}

export type GameWithRelations = Games & GameRelations;
