import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Cliente, ClienteRelations, ContatoC} from '../models';
import {ContatoCRepository} from './contato-c.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly contatoCS: HasManyRepositoryFactory<ContatoC, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ContatoCRepository') protected contatoCRepositoryGetter: Getter<ContatoCRepository>,
  ) {
    super(Cliente, dataSource);
    this.contatoCS = this.createHasManyRepositoryFactoryFor('contatoCS', contatoCRepositoryGetter,);
    this.registerInclusionResolver('contatoCS', this.contatoCS.inclusionResolver);
  }
}
