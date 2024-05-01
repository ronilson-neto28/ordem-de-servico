import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TipoDispositivo, TipoDispositivoRelations, ModeloDispositivo} from '../models';
import {ModeloDispositivoRepository} from './modelo-dispositivo.repository';

export class TipoDispositivoRepository extends DefaultCrudRepository<
  TipoDispositivo,
  typeof TipoDispositivo.prototype.id,
  TipoDispositivoRelations
> {

  public readonly modeloDispositivos: HasManyRepositoryFactory<ModeloDispositivo, typeof TipoDispositivo.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ModeloDispositivoRepository') protected modeloDispositivoRepositoryGetter: Getter<ModeloDispositivoRepository>,
  ) {
    super(TipoDispositivo, dataSource);
    this.modeloDispositivos = this.createHasManyRepositoryFactoryFor('modeloDispositivos', modeloDispositivoRepositoryGetter,);
    this.registerInclusionResolver('modeloDispositivos', this.modeloDispositivos.inclusionResolver);
  }
}
