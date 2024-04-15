import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Logs, LogRelations} from '../models';

export class LogRepository extends DefaultCrudRepository<
  Logs,
  typeof Logs.prototype.Log_ID,
  LogRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Logs, dataSource);
  }
}
