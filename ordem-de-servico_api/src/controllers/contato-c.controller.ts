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
import {ContatoC} from '../models';
import {ContatoCRepository} from '../repositories';

export class ContatoCController {
  constructor(
    @repository(ContatoCRepository)
    public contatoCRepository : ContatoCRepository,
  ) {}

  @post('/contato-cs')
  @response(200, {
    description: 'ContatoC model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContatoC)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoC, {
            title: 'NewContatoC',
            exclude: ['id'],
          }),
        },
      },
    })
    contatoC: Omit<ContatoC, 'id'>,
  ): Promise<ContatoC> {
    return this.contatoCRepository.create(contatoC);
  }

  @get('/contato-cs/count')
  @response(200, {
    description: 'ContatoC model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ContatoC) where?: Where<ContatoC>,
  ): Promise<Count> {
    return this.contatoCRepository.count(where);
  }

  @get('/contato-cs')
  @response(200, {
    description: 'Array of ContatoC model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContatoC, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ContatoC) filter?: Filter<ContatoC>,
  ): Promise<ContatoC[]> {
    return this.contatoCRepository.find(filter);
  }

  @patch('/contato-cs')
  @response(200, {
    description: 'ContatoC PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoC, {partial: true}),
        },
      },
    })
    contatoC: ContatoC,
    @param.where(ContatoC) where?: Where<ContatoC>,
  ): Promise<Count> {
    return this.contatoCRepository.updateAll(contatoC, where);
  }

  @get('/contato-cs/{id}')
  @response(200, {
    description: 'ContatoC model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContatoC, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ContatoC, {exclude: 'where'}) filter?: FilterExcludingWhere<ContatoC>
  ): Promise<ContatoC> {
    return this.contatoCRepository.findById(id, filter);
  }

  @patch('/contato-cs/{id}')
  @response(204, {
    description: 'ContatoC PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoC, {partial: true}),
        },
      },
    })
    contatoC: ContatoC,
  ): Promise<void> {
    await this.contatoCRepository.updateById(id, contatoC);
  }

  @put('/contato-cs/{id}')
  @response(204, {
    description: 'ContatoC PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contatoC: ContatoC,
  ): Promise<void> {
    await this.contatoCRepository.replaceById(id, contatoC);
  }

  @del('/contato-cs/{id}')
  @response(204, {
    description: 'ContatoC DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contatoCRepository.deleteById(id);
  }
}
