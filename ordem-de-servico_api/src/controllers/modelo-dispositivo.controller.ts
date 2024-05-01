import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ModeloDispositivo} from '../models';
import {ModeloDispositivoRepository} from '../repositories';

export class ModeloDispositivoController {
  constructor(
    @repository(ModeloDispositivoRepository)
    public modeloDispositivoRepository : ModeloDispositivoRepository,
  ) {}

  @post('/modelo-dispositivos')
  @response(200, {
    description: 'ModeloDispositivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ModeloDispositivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModeloDispositivo, {
            title: 'NewModeloDispositivo',
            exclude: ['id'],
          }),
        },
      },
    })
    modeloDispositivo: Omit<ModeloDispositivo, 'id'>,
  ): Promise<ModeloDispositivo> {
    return this.modeloDispositivoRepository.create(modeloDispositivo);
  }

  @get('/modelo-dispositivos/count')
  @response(200, {
    description: 'ModeloDispositivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ModeloDispositivo) where?: Where<ModeloDispositivo>,
  ): Promise<Count> {
    return this.modeloDispositivoRepository.count(where);
  }

  @get('/modelo-dispositivos')
  @response(200, {
    description: 'Array of ModeloDispositivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ModeloDispositivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ModeloDispositivo) filter?: Filter<ModeloDispositivo>,
  ): Promise<ModeloDispositivo[]> {
    return this.modeloDispositivoRepository.find(filter);
  }

  @patch('/modelo-dispositivos')
  @response(200, {
    description: 'ModeloDispositivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModeloDispositivo, {partial: true}),
        },
      },
    })
    modeloDispositivo: ModeloDispositivo,
    @param.where(ModeloDispositivo) where?: Where<ModeloDispositivo>,
  ): Promise<Count> {
    return this.modeloDispositivoRepository.updateAll(modeloDispositivo, where);
  }

  @get('/modelo-dispositivos/{id}')
  @response(200, {
    description: 'ModeloDispositivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModeloDispositivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ModeloDispositivo, {exclude: 'where'}) filter?: FilterExcludingWhere<ModeloDispositivo>
  ): Promise<ModeloDispositivo> {
    return this.modeloDispositivoRepository.findById(id, filter);
  }

  @patch('/modelo-dispositivos/{id}')
  @response(204, {
    description: 'ModeloDispositivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModeloDispositivo, {partial: true}),
        },
      },
    })
    modeloDispositivo: ModeloDispositivo,
  ): Promise<void> {
    await this.modeloDispositivoRepository.updateById(id, modeloDispositivo);
  }

  @put('/modelo-dispositivos/{id}')
  @response(204, {
    description: 'ModeloDispositivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() modeloDispositivo: ModeloDispositivo,
  ): Promise<void> {
    await this.modeloDispositivoRepository.replaceById(id, modeloDispositivo);
  }

  @del('/modelo-dispositivos/{id}')
  @response(204, {
    description: 'ModeloDispositivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.modeloDispositivoRepository.deleteById(id);
  }
}
