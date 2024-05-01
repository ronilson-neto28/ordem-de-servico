import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Dispositivo,
  ModeloDispositivo,
} from '../models';
import {DispositivoRepository} from '../repositories';

export class DispositivoModeloDispositivoController {
  constructor(
    @repository(DispositivoRepository)
    public dispositivoRepository: DispositivoRepository,
  ) { }

  @get('/dispositivos/{id}/modelo-dispositivo', {
    responses: {
      '200': {
        description: 'ModeloDispositivo belonging to Dispositivo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ModeloDispositivo),
          },
        },
      },
    },
  })
  async getModeloDispositivo(
    @param.path.number('id') id: typeof Dispositivo.prototype.id,
  ): Promise<ModeloDispositivo> {
    return this.dispositivoRepository.modeloDispositivo(id);
  }
}
