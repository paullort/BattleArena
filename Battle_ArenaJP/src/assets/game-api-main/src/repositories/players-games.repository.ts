import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Players_Games, PlayersGamesRelations} from '../models';

export class PlayersGamesRepository extends DefaultCrudRepository<
  Players_Games,
  typeof Players_Games.prototype.game_ID,
  PlayersGamesRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Players_Games, dataSource);
  }
}
