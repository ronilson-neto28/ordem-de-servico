import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estoque,
  ModeloDispositivo,
} from '../models';
import {EstoqueRepository} from '../repositories';

export class EstoqueModeloDispositivoController {
  constructor(
    @repository(EstoqueRepository)
    public estoqueRepository: EstoqueRepository,
  ) { }

  @get('/estoques/{id}/modelo-dispositivo', {
    responses: {
      '200': {
        description: 'ModeloDispositivo belonging to Estoque',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ModeloDispositivo),
          },
        },
      },
    },
  })
  async getModeloDispositivo(
    @param.path.number('id') id: typeof Estoque.prototype.id,
  ): Promise<ModeloDispositivo> {
    return this.estoqueRepository.modeloDispositivoEstoque(id);
  }
}
