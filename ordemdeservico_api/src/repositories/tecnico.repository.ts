import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Tecnico, TecnicoRelations} from '../models';

export class TecnicoRepository extends DefaultCrudRepository<
  Tecnico,
  typeof Tecnico.prototype.id,
  TecnicoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(Tecnico, dataSource);
  }
}
