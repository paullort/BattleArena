import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Attacks, AttackRelations} from '../models';

export class AttackRepository extends DefaultCrudRepository<
  Attacks,
  typeof Attacks.prototype.attack_ID,
  AttackRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Attacks, dataSource);
  }
}
