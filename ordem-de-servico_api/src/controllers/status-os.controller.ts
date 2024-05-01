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
import {StatusOs} from '../models';
import {StatusOsRepository} from '../repositories';

export class StatusOsController {
  constructor(
    @repository(StatusOsRepository)
    public statusOsRepository : StatusOsRepository,
  ) {}

  @post('/status-os')
  @response(200, {
    description: 'StatusOs model instance',
    content: {'application/json': {schema: getModelSchemaRef(StatusOs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOs, {
            title: 'NewStatusOs',
            exclude: ['id'],
          }),
        },
      },
    })
    statusOs: Omit<StatusOs, 'id'>,
  ): Promise<StatusOs> {
    return this.statusOsRepository.create(statusOs);
  }

  @get('/status-os/count')
  @response(200, {
    description: 'StatusOs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StatusOs) where?: Where<StatusOs>,
  ): Promise<Count> {
    return this.statusOsRepository.count(where);
  }

  @get('/status-os')
  @response(200, {
    description: 'Array of StatusOs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StatusOs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StatusOs) filter?: Filter<StatusOs>,
  ): Promise<StatusOs[]> {
    return this.statusOsRepository.find(filter);
  }

  @patch('/status-os')
  @response(200, {
    description: 'StatusOs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOs, {partial: true}),
        },
      },
    })
    statusOs: StatusOs,
    @param.where(StatusOs) where?: Where<StatusOs>,
  ): Promise<Count> {
    return this.statusOsRepository.updateAll(statusOs, where);
  }

  @get('/status-os/{id}')
  @response(200, {
    description: 'StatusOs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StatusOs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(StatusOs, {exclude: 'where'}) filter?: FilterExcludingWhere<StatusOs>
  ): Promise<StatusOs> {
    return this.statusOsRepository.findById(id, filter);
  }

  @patch('/status-os/{id}')
  @response(204, {
    description: 'StatusOs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StatusOs, {partial: true}),
        },
      },
    })
    statusOs: StatusOs,
  ): Promise<void> {
    await this.statusOsRepository.updateById(id, statusOs);
  }

  @put('/status-os/{id}')
  @response(204, {
    description: 'StatusOs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() statusOs: StatusOs,
  ): Promise<void> {
    await this.statusOsRepository.replaceById(id, statusOs);
  }

  @del('/status-os/{id}')
  @response(204, {
    description: 'StatusOs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.statusOsRepository.deleteById(id);
  }
}
