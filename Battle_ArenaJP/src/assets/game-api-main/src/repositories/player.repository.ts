import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Players, PlayerRelations, Attacks} from '../models';
import { AttackRepository } from './attack.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Players,
  typeof Players.prototype.player_ID,
  PlayerRelations
> {
  public readonly attacks: HasManyRepositoryFactory<
  Attacks,
  typeof Attacks.prototype.attack_ID
>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
    @repository.getter('AttackRepository')
    attackRepositoryGetter: Getter<AttackRepository>
  ) {
    super(Players, dataSource);
    this.attacks = this.createHasManyRepositoryFactoryFor(
      'attacks',
      attackRepositoryGetter,
    );
  }

}
