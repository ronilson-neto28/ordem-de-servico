import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Servico, ServicoRelations, ModeloDispositivo} from '../models';
import {ModeloDispositivoRepository} from './modelo-dispositivo.repository';

export class ServicoRepository extends DefaultCrudRepository<
  Servico,
  typeof Servico.prototype.id,
  ServicoRelations
> {

  public readonly servicoModeloDispositivo: BelongsToAccessor<ModeloDispositivo, typeof Servico.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ModeloDispositivoRepository') protected modeloDispositivoRepositoryGetter: Getter<ModeloDispositivoRepository>,
  ) {
    super(Servico, dataSource);
    this.servicoModeloDispositivo = this.createBelongsToAccessorFor('servicoModeloDispositivo', modeloDispositivoRepositoryGetter,);
    this.registerInclusionResolver('servicoModeloDispositivo', this.servicoModeloDispositivo.inclusionResolver);
  }
}
