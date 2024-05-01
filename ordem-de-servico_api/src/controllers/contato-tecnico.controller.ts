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
import {ContatoTecnico} from '../models';
import {ContatoTecnicoRepository} from '../repositories';

export class ContatoTecnicoController {
  constructor(
    @repository(ContatoTecnicoRepository)
    public contatoTecnicoRepository : ContatoTecnicoRepository,
  ) {}

  @post('/contato-tecnicos')
  @response(200, {
    description: 'ContatoTecnico model instance',
    content: {'application/json': {schema: getModelSchemaRef(ContatoTecnico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoTecnico, {
            title: 'NewContatoTecnico',
            exclude: ['id'],
          }),
        },
      },
    })
    contatoTecnico: Omit<ContatoTecnico, 'id'>,
  ): Promise<ContatoTecnico> {
    return this.contatoTecnicoRepository.create(contatoTecnico);
  }

  @get('/contato-tecnicos/count')
  @response(200, {
    description: 'ContatoTecnico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ContatoTecnico) where?: Where<ContatoTecnico>,
  ): Promise<Count> {
    return this.contatoTecnicoRepository.count(where);
  }

  @get('/contato-tecnicos')
  @response(200, {
    description: 'Array of ContatoTecnico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ContatoTecnico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ContatoTecnico) filter?: Filter<ContatoTecnico>,
  ): Promise<ContatoTecnico[]> {
    return this.contatoTecnicoRepository.find(filter);
  }

  @patch('/contato-tecnicos')
  @response(200, {
    description: 'ContatoTecnico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoTecnico, {partial: true}),
        },
      },
    })
    contatoTecnico: ContatoTecnico,
    @param.where(ContatoTecnico) where?: Where<ContatoTecnico>,
  ): Promise<Count> {
    return this.contatoTecnicoRepository.updateAll(contatoTecnico, where);
  }

  @get('/contato-tecnicos/{id}')
  @response(200, {
    description: 'ContatoTecnico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ContatoTecnico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ContatoTecnico, {exclude: 'where'}) filter?: FilterExcludingWhere<ContatoTecnico>
  ): Promise<ContatoTecnico> {
    return this.contatoTecnicoRepository.findById(id, filter);
  }

  @patch('/contato-tecnicos/{id}')
  @response(204, {
    description: 'ContatoTecnico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoTecnico, {partial: true}),
        },
      },
    })
    contatoTecnico: ContatoTecnico,
  ): Promise<void> {
    await this.contatoTecnicoRepository.updateById(id, contatoTecnico);
  }

  @put('/contato-tecnicos/{id}')
  @response(204, {
    description: 'ContatoTecnico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() contatoTecnico: ContatoTecnico,
  ): Promise<void> {
    await this.contatoTecnicoRepository.replaceById(id, contatoTecnico);
  }

  @del('/contato-tecnicos/{id}')
  @response(204, {
    description: 'ContatoTecnico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contatoTecnicoRepository.deleteById(id);
  }
}
