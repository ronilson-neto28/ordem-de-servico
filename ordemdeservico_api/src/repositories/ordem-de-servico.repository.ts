import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrdemDeServico, OrdemDeServicoRelations} from '../models';

export class OrdemDeServicoRepository extends DefaultCrudRepository<
  OrdemDeServico,
  typeof OrdemDeServico.prototype.id,
  OrdemDeServicoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(OrdemDeServico, dataSource);
  }
}
