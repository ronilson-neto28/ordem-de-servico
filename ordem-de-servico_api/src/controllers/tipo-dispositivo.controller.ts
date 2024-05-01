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
import {TipoDispositivo} from '../models';
import {TipoDispositivoRepository} from '../repositories';

export class TipoDispositivoController {
  constructor(
    @repository(TipoDispositivoRepository)
    public tipoDispositivoRepository : TipoDispositivoRepository,
  ) {}

  @post('/tipo-dispositivos')
  @response(200, {
    description: 'TipoDispositivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoDispositivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDispositivo, {
            title: 'NewTipoDispositivo',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoDispositivo: Omit<TipoDispositivo, 'id'>,
  ): Promise<TipoDispositivo> {
    return this.tipoDispositivoRepository.create(tipoDispositivo);
  }

  @get('/tipo-dispositivos/count')
  @response(200, {
    description: 'TipoDispositivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoDispositivo) where?: Where<TipoDispositivo>,
  ): Promise<Count> {
    return this.tipoDispositivoRepository.count(where);
  }

  @get('/tipo-dispositivos')
  @response(200, {
    description: 'Array of TipoDispositivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoDispositivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoDispositivo) filter?: Filter<TipoDispositivo>,
  ): Promise<TipoDispositivo[]> {
    return this.tipoDispositivoRepository.find(filter);
  }

  @patch('/tipo-dispositivos')
  @response(200, {
    description: 'TipoDispositivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDispositivo, {partial: true}),
        },
      },
    })
    tipoDispositivo: TipoDispositivo,
    @param.where(TipoDispositivo) where?: Where<TipoDispositivo>,
  ): Promise<Count> {
    return this.tipoDispositivoRepository.updateAll(tipoDispositivo, where);
  }

  @get('/tipo-dispositivos/{id}')
  @response(200, {
    description: 'TipoDispositivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoDispositivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoDispositivo, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoDispositivo>
  ): Promise<TipoDispositivo> {
    return this.tipoDispositivoRepository.findById(id, filter);
  }

  @patch('/tipo-dispositivos/{id}')
  @response(204, {
    description: 'TipoDispositivo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoDispositivo, {partial: true}),
        },
      },
    })
    tipoDispositivo: TipoDispositivo,
  ): Promise<void> {
    await this.tipoDispositivoRepository.updateById(id, tipoDispositivo);
  }

  @put('/tipo-dispositivos/{id}')
  @response(204, {
    description: 'TipoDispositivo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoDispositivo: TipoDispositivo,
  ): Promise<void> {
    await this.tipoDispositivoRepository.replaceById(id, tipoDispositivo);
  }

  @del('/tipo-dispositivos/{id}')
  @response(204, {
    description: 'TipoDispositivo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoDispositivoRepository.deleteById(id);
  }
}
