import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {HealObjects, HealObjectRelations} from '../models';

export class HealObjectRepository extends DefaultCrudRepository<
  HealObjects,
  typeof HealObjects.prototype.heal_object_ID,
  HealObjectRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(HealObjects, dataSource);
  }
}
