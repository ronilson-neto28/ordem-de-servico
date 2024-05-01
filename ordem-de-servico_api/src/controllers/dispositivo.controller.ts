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
import {Dispositivo} from '../models';
import {DispositivoRepository} from '../repositories';

export class DispositivoController {
  constructor(
    @repository(DispositivoRepository)
    public dispositivoRepository : DispositivoRepository,
  ) {}

  @post('/dispositivos')
  @response(200, {
    description: 'Dispositivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Dispositivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dispositivo, {
            title: 'NewDispositivo',
            exclude: ['id'],
          }),
        },
      },
    })
    dispositivo: Omit<Dispositivo, 'id'>,
  ): Promise<Dispositivo> {
    return this.dispositivoRepository.create(dispositivo);
  }

  @get('/dispositivos/count')
  @response(200, {
    description: 'Dispositivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Dispositivo) where?: Where<Dispositivo>,
  ): Promise<Count> {
    return this.dispositivoRepository.count(where);
  }

  @get('/dispositivos')
  @response(200, {
    description: 'Array of Dispositivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Dispositivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Dispositivo) filter?: Filter<Dispositivo>,
  ): Promise<Dispositivo[]> {
    return this.dispositivoRepository.find(filter);
  }

  @patch('/dispositivos')
  @response(200, {
    description: 'Dispositivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dispositivo, {partial: true}),
        },
      },
    })
    dispositivo: Dispositivo,
    @param.where(Dispositivo) where?: Where<Dispositivo>,
  ): Promise<Count> {
    return this.dispositivoRepository.updateAll(dispositivo, where);
  }

  @get('/dispositivos/{id}')
  @response(200, {
    description: 'Dispositivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Dispositivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Dispositivo, {exclude: 'where'}) filter?: FilterExcludingWhere<Dispositivo>
  ): Promise<Dispositivo> {
    return this.dispositivoRepository.findById(id, filter);
  }

  @patch('/dispositivos/{id}')
  @response(204, {
    description: 'Dispositivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dispositivo, {partial: true}),
        },
      },
    })
    dispositivo: Dispositivo,
  ): Promise<void> {
    await this.dispositivoRepository.updateById(id, dispositivo);
  }

  @put('/dispositivos/{id}')
  @response(204, {
    description: 'Dispositivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() dispositivo: Dispositivo,
  ): Promise<void> {
    await this.dispositivoRepository.replaceById(id, dispositivo);
  }

  @del('/dispositivos/{id}')
  @response(204, {
    description: 'Dispositivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.dispositivoRepository.deleteById(id);
  }
}
