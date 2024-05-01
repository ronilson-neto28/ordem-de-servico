import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ContatoC, ContatoCRelations} from '../models';

export class ContatoCRepository extends DefaultCrudRepository<
  ContatoC,
  typeof ContatoC.prototype.id,
  ContatoCRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(ContatoC, dataSource);
  }
}
