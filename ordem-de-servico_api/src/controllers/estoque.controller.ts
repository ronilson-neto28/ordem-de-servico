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
import {Estoque} from '../models';
import {EstoqueRepository} from '../repositories';

export class EstoqueController {
  constructor(
    @repository(EstoqueRepository)
    public estoqueRepository : EstoqueRepository,
  ) {}

  @post('/estoques')
  @response(200, {
    description: 'Estoque model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estoque)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoque, {
            title: 'NewEstoque',
            exclude: ['id'],
          }),
        },
      },
    })
    estoque: Omit<Estoque, 'id'>,
  ): Promise<Estoque> {
    return this.estoqueRepository.create(estoque);
  }

  @get('/estoques/count')
  @response(200, {
    description: 'Estoque model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Estoque) where?: Where<Estoque>,
  ): Promise<Count> {
    return this.estoqueRepository.count(where);
  }

  @get('/estoques')
  @response(200, {
    description: 'Array of Estoque model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estoque, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estoque) filter?: Filter<Estoque>,
  ): Promise<Estoque[]> {
    return this.estoqueRepository.find(filter);
  }

  @patch('/estoques')
  @response(200, {
    description: 'Estoque PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoque, {partial: true}),
        },
      },
    })
    estoque: Estoque,
    @param.where(Estoque) where?: Where<Estoque>,
  ): Promise<Count> {
    return this.estoqueRepository.updateAll(estoque, where);
  }

  @get('/estoques/{id}')
  @response(200, {
    description: 'Estoque model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estoque, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Estoque, {exclude: 'where'}) filter?: FilterExcludingWhere<Estoque>
  ): Promise<Estoque> {
    return this.estoqueRepository.findById(id, filter);
  }

  @patch('/estoques/{id}')
  @response(204, {
    description: 'Estoque PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estoque, {partial: true}),
        },
      },
    })
    estoque: Estoque,
  ): Promise<void> {
    await this.estoqueRepository.updateById(id, estoque);
  }

  @put('/estoques/{id}')
  @response(204, {
    description: 'Estoque PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estoque: Estoque,
  ): Promise<void> {
    await this.estoqueRepository.replaceById(id, estoque);
  }

  @del('/estoques/{id}')
  @response(204, {
    description: 'Estoque DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estoqueRepository.deleteById(id);
  }
}
