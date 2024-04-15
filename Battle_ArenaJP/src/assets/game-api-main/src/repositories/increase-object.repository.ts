import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {IncreaseObjects, IncreaseObjectRelations} from '../models';

export class IncreaseObjectRepository extends DefaultCrudRepository<
  IncreaseObjects,
  typeof IncreaseObjects.prototype.increase_object_ID,
  IncreaseObjectRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(IncreaseObjects, dataSource);
  }
}
