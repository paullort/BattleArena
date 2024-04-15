import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {MovementObjects, MovementObjectRelations} from '../models';

export class MovementObjectRepository extends DefaultCrudRepository<
  MovementObjects,
  typeof MovementObjects.prototype.movement_object_ID,
  MovementObjectRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(MovementObjects, dataSource);
  }
}
