import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Os,
  Dispositivo,
} from '../models';
import {OsRepository} from '../repositories';

export class OsDispositivoController {
  constructor(
    @repository(OsRepository)
    public osRepository: OsRepository,
  ) { }

  @get('/os/{id}/dispositivo', {
    responses: {
      '200': {
        description: 'Dispositivo belonging to Os',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dispositivo),
          },
        },
      },
    },
  })
  async getDispositivo(
    @param.path.number('id') id: typeof Os.prototype.id,
  ): Promise<Dispositivo> {
    return this.osRepository.dispositivoOs(id);
  }
}
