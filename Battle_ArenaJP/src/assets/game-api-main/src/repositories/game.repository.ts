import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Games, GameRelations, Players_Games} from '../models';
import {PlayersGamesRepository} from './players-games.repository';

export class GamesRepository extends DefaultCrudRepository<
  Games,
  typeof Games.prototype.game_ID,
  GameRelations
> {
  public readonly players: HasManyRepositoryFactory<
  Players_Games,
  typeof Games.prototype.game_ID
>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('PlayersGamesRepository')
    playersGamesRepository: Getter<PlayersGamesRepository>
  ) {
    super(Games, dataSource);
    this.players = this.createHasManyRepositoryFactoryFor(
      'players_games',
      playersGamesRepository,
    );
    this.registerInclusionResolver('players_games', this.players.inclusionResolver);
  }

}
