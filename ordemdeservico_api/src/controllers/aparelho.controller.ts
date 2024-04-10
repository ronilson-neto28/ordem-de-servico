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
import {Aparelho} from '../models';
import {AparelhoRepository} from '../repositories';

export class AparelhoController {
  constructor(
    @repository(AparelhoRepository)
    public aparelhoRepository : AparelhoRepository,
  ) {}

  @post('/aparelhos')
  @response(200, {
    description: 'Aparelho model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aparelho)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aparelho, {
            title: 'NewAparelho',
            exclude: ['id'],
          }),
        },
      },
    })
    aparelho: Omit<Aparelho, 'id'>,
  ): Promise<Aparelho> {
    return this.aparelhoRepository.create(aparelho);
  }

  @get('/aparelhos/count')
  @response(200, {
    description: 'Aparelho model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aparelho) where?: Where<Aparelho>,
  ): Promise<Count> {
    return this.aparelhoRepository.count(where);
  }

  @get('/aparelhos')
  @response(200, {
    description: 'Array of Aparelho model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aparelho, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aparelho) filter?: Filter<Aparelho>,
  ): Promise<Aparelho[]> {
    return this.aparelhoRepository.find(filter);
  }

  @patch('/aparelhos')
  @response(200, {
    description: 'Aparelho PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aparelho, {partial: true}),
        },
      },
    })
    aparelho: Aparelho,
    @param.where(Aparelho) where?: Where<Aparelho>,
  ): Promise<Count> {
    return this.aparelhoRepository.updateAll(aparelho, where);
  }

  @get('/aparelhos/{id}')
  @response(200, {
    description: 'Aparelho model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aparelho, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aparelho, {exclude: 'where'}) filter?: FilterExcludingWhere<Aparelho>
  ): Promise<Aparelho> {
    return this.aparelhoRepository.findById(id, filter);
  }

  @patch('/aparelhos/{id}')
  @response(204, {
    description: 'Aparelho PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aparelho, {partial: true}),
        },
      },
    })
    aparelho: Aparelho,
  ): Promise<void> {
    await this.aparelhoRepository.updateById(id, aparelho);
  }

  @put('/aparelhos/{id}')
  @response(204, {
    description: 'Aparelho PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aparelho: Aparelho,
  ): Promise<void> {
    await this.aparelhoRepository.replaceById(id, aparelho);
  }

  @del('/aparelhos/{id}')
  @response(204, {
    description: 'Aparelho DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.aparelhoRepository.deleteById(id);
  }
}
