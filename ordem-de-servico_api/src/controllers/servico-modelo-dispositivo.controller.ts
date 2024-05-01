import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Servico,
  ModeloDispositivo,
} from '../models';
import {ServicoRepository} from '../repositories';

export class ServicoModeloDispositivoController {
  constructor(
    @repository(ServicoRepository)
    public servicoRepository: ServicoRepository,
  ) { }

  @get('/servicos/{id}/modelo-dispositivo', {
    responses: {
      '200': {
        description: 'ModeloDispositivo belonging to Servico',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ModeloDispositivo),
          },
        },
      },
    },
  })
  async getModeloDispositivo(
    @param.path.number('id') id: typeof Servico.prototype.id,
  ): Promise<ModeloDispositivo> {
    return this.servicoRepository.servicoModeloDispositivo(id);
  }
}
