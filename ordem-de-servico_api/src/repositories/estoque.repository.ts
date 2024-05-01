import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Estoque, EstoqueRelations, ModeloDispositivo} from '../models';
import {ModeloDispositivoRepository} from './modelo-dispositivo.repository';

export class EstoqueRepository extends DefaultCrudRepository<
  Estoque,
  typeof Estoque.prototype.id,
  EstoqueRelations
> {

  public readonly modeloDispositivoEstoque: BelongsToAccessor<ModeloDispositivo, typeof Estoque.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ModeloDispositivoRepository') protected modeloDispositivoRepositoryGetter: Getter<ModeloDispositivoRepository>,
  ) {
    super(Estoque, dataSource);
    this.modeloDispositivoEstoque = this.createBelongsToAccessorFor('modeloDispositivoEstoque', modeloDispositivoRepositoryGetter,);
    this.registerInclusionResolver('modeloDispositivoEstoque', this.modeloDispositivoEstoque.inclusionResolver);
  }
}
