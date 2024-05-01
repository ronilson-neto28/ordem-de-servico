import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Os, OsRelations, Tecnico, Cliente, Dispositivo, StatusOs} from '../models';
import {TecnicoRepository} from './tecnico.repository';
import {ClienteRepository} from './cliente.repository';
import {DispositivoRepository} from './dispositivo.repository';
import {StatusOsRepository} from './status-os.repository';

export class OsRepository extends DefaultCrudRepository<
  Os,
  typeof Os.prototype.id,
  OsRelations
> {

  public readonly tecnicoOs: BelongsToAccessor<Tecnico, typeof Os.prototype.id>;

  public readonly clienteOs: BelongsToAccessor<Cliente, typeof Os.prototype.id>;

  public readonly dispositivoOs: BelongsToAccessor<Dispositivo, typeof Os.prototype.id>;

  public readonly statusOs: BelongsToAccessor<StatusOs, typeof Os.prototype.id>;

  constructor(
    @inject('datasources.Postgres') dataSource: PostgresDataSource, @repository.getter('TecnicoRepository') protected tecnicoRepositoryGetter: Getter<TecnicoRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DispositivoRepository') protected dispositivoRepositoryGetter: Getter<DispositivoRepository>, @repository.getter('StatusOsRepository') protected statusOsRepositoryGetter: Getter<StatusOsRepository>,
  ) {
    super(Os, dataSource);
    this.statusOs = this.createBelongsToAccessorFor('statusOs', statusOsRepositoryGetter,);
    this.registerInclusionResolver('statusOs', this.statusOs.inclusionResolver);
    this.dispositivoOs = this.createBelongsToAccessorFor('dispositivoOs', dispositivoRepositoryGetter,);
    this.registerInclusionResolver('dispositivoOs', this.dispositivoOs.inclusionResolver);
    this.clienteOs = this.createBelongsToAccessorFor('clienteOs', clienteRepositoryGetter,);
    this.registerInclusionResolver('clienteOs', this.clienteOs.inclusionResolver);
    this.tecnicoOs = this.createBelongsToAccessorFor('tecnicoOs', tecnicoRepositoryGetter,);
    this.registerInclusionResolver('tecnicoOs', this.tecnicoOs.inclusionResolver);
  }
}
