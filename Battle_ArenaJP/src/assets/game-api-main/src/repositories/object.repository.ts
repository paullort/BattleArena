import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Objects, ObjectRelations} from '../models';

export class ObjectRepository extends DefaultCrudRepository<
  Objects,
  typeof Objects.prototype.object_ID,
  ObjectRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Objects, dataSource);
  }
}
