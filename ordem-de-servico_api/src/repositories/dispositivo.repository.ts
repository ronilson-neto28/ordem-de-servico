import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Dispositivo, DispositivoRelations, Cliente, ModeloDispositivo} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ModeloDispositivoRepository} from './modelo-dispositivo.repository';

export class DispositivoRepository extends DefaultCrudRepository<
  Dispositivo,
  typeof Dispositivo.prototype.id,
  DispositivoRelations
> {

  public readonly clienteDispositivo: BelongsToAccessor<Cliente, typeof Dispositivo.prototype.id>;

  public readonly modeloDispositivo: BelongsToAccessor<ModeloDispositivo, typeof Dispositivo.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ModeloDispositivoRepository') protected modeloDispositivoRepositoryGetter: Getter<ModeloDispositivoRepository>,
  ) {
    super(Dispositivo, dataSource);
    this.modeloDispositivo = this.createBelongsToAccessorFor('modeloDispositivo', modeloDispositivoRepositoryGetter,);
    this.registerInclusionResolver('modeloDispositivo', this.modeloDispositivo.inclusionResolver);
    this.clienteDispositivo = this.createBelongsToAccessorFor('clienteDispositivo', clienteRepositoryGetter,);
    this.registerInclusionResolver('clienteDispositivo', this.clienteDispositivo.inclusionResolver);
  }
}
