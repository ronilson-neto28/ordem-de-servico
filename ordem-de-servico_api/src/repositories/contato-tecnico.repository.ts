import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ContatoTecnico, ContatoTecnicoRelations} from '../models';

export class ContatoTecnicoRepository extends DefaultCrudRepository<
  ContatoTecnico,
  typeof ContatoTecnico.prototype.id,
  ContatoTecnicoRelations
> {
  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource,
  ) {
    super(ContatoTecnico, dataSource);
  }
}
