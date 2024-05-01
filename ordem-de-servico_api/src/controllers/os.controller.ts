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
import {Os} from '../models';
import {OsRepository} from '../repositories';

export class OsController {
  constructor(
    @repository(OsRepository)
    public osRepository : OsRepository,
  ) {}

  @post('/os')
  @response(200, {
    description: 'Os model instance',
    content: {'application/json': {schema: getModelSchemaRef(Os)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Os, {
            title: 'NewOs',
            exclude: ['id'],
          }),
        },
      },
    })
    os: Omit<Os, 'id'>,
  ): Promise<Os> {
    return this.osRepository.create(os);
  }

  @get('/os/count')
  @response(200, {
    description: 'Os model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Os) where?: Where<Os>,
  ): Promise<Count> {
    return this.osRepository.count(where);
  }

  @get('/os')
  @response(200, {
    description: 'Array of Os model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Os, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Os) filter?: Filter<Os>,
  ): Promise<Os[]> {
    return this.osRepository.find(filter);
  }

  @patch('/os')
  @response(200, {
    description: 'Os PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Os, {partial: true}),
        },
      },
    })
    os: Os,
    @param.where(Os) where?: Where<Os>,
  ): Promise<Count> {
    return this.osRepository.updateAll(os, where);
  }

  @get('/os/{id}')
  @response(200, {
    description: 'Os model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Os, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Os, {exclude: 'where'}) filter?: FilterExcludingWhere<Os>
  ): Promise<Os> {
    return this.osRepository.findById(id, filter);
  }

  @patch('/os/{id}')
  @response(204, {
    description: 'Os PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Os, {partial: true}),
        },
      },
    })
    os: Os,
  ): Promise<void> {
    await this.osRepository.updateById(id, os);
  }

  @put('/os/{id}')
  @response(204, {
    description: 'Os PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() os: Os,
  ): Promise<void> {
    await this.osRepository.replaceById(id, os);
  }

  @del('/os/{id}')
  @response(204, {
    description: 'Os DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.osRepository.deleteById(id);
  }
}
