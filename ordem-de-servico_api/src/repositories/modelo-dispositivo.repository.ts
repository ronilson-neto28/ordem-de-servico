import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ModeloDispositivo, ModeloDispositivoRelations} from '../models';

export class ModeloDispositivoRepository extends DefaultCrudRepository<
  ModeloDispositivo,
  typeof ModeloDispositivo.prototype.id,
  ModeloDispositivoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(ModeloDispositivo, dataSource);
  }
}
