import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Tecnico, TecnicoRelations, ContatoTecnico} from '../models';
import {ContatoTecnicoRepository} from './contato-tecnico.repository';

export class TecnicoRepository extends DefaultCrudRepository<
  Tecnico,
  typeof Tecnico.prototype.id,
  TecnicoRelations
> {

  public readonly contatoTecnicos: HasManyRepositoryFactory<ContatoTecnico, typeof Tecnico.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ContatoTecnicoRepository') protected contatoTecnicoRepositoryGetter: Getter<ContatoTecnicoRepository>,
  ) {
    super(Tecnico, dataSource);
    this.contatoTecnicos = this.createHasManyRepositoryFactoryFor('contatoTecnicos', contatoTecnicoRepositoryGetter,);
    this.registerInclusionResolver('contatoTecnicos', this.contatoTecnicos.inclusionResolver);
  }
}
