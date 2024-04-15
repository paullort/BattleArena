import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProtectionObjects, ProtectionObjectRelations} from '../models';

export class ProtectionObjectRepository extends DefaultCrudRepository<
  ProtectionObjects,
  typeof ProtectionObjects.prototype.protection_object_ID,
  ProtectionObjectRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(ProtectionObjects, dataSource);
  }
}
