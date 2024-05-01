import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {StatusOs, StatusOsRelations} from '../models';

export class StatusOsRepository extends DefaultCrudRepository<
  StatusOs,
  typeof StatusOs.prototype.id,
  StatusOsRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(StatusOs, dataSource);
  }
}
