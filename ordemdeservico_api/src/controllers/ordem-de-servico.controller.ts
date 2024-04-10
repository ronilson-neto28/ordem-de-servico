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
import {OrdemDeServico} from '../models';
import {OrdemDeServicoRepository} from '../repositories';

export class OrdemDeServicoController {
  constructor(
    @repository(OrdemDeServicoRepository)
    public ordemDeServicoRepository : OrdemDeServicoRepository,
  ) {}

  @post('/ordem-de-servicos')
  @response(200, {
    description: 'OrdemDeServico model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrdemDeServico)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemDeServico, {
            title: 'NewOrdemDeServico',
            exclude: ['id'],
          }),
        },
      },
    })
    ordemDeServico: Omit<OrdemDeServico, 'id'>,
  ): Promise<OrdemDeServico> {
    return this.ordemDeServicoRepository.create(ordemDeServico);
  }

  @get('/ordem-de-servicos/count')
  @response(200, {
    description: 'OrdemDeServico model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrdemDeServico) where?: Where<OrdemDeServico>,
  ): Promise<Count> {
    return this.ordemDeServicoRepository.count(where);
  }

  @get('/ordem-de-servicos')
  @response(200, {
    description: 'Array of OrdemDeServico model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrdemDeServico, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrdemDeServico) filter?: Filter<OrdemDeServico>,
  ): Promise<OrdemDeServico[]> {
    return this.ordemDeServicoRepository.find(filter);
  }

  @patch('/ordem-de-servicos')
  @response(200, {
    description: 'OrdemDeServico PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemDeServico, {partial: true}),
        },
      },
    })
    ordemDeServico: OrdemDeServico,
    @param.where(OrdemDeServico) where?: Where<OrdemDeServico>,
  ): Promise<Count> {
    return this.ordemDeServicoRepository.updateAll(ordemDeServico, where);
  }

  @get('/ordem-de-servicos/{id}')
  @response(200, {
    description: 'OrdemDeServico model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrdemDeServico, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OrdemDeServico, {exclude: 'where'}) filter?: FilterExcludingWhere<OrdemDeServico>
  ): Promise<OrdemDeServico> {
    return this.ordemDeServicoRepository.findById(id, filter);
  }

  @patch('/ordem-de-servicos/{id}')
  @response(204, {
    description: 'OrdemDeServico PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrdemDeServico, {partial: true}),
        },
      },
    })
    ordemDeServico: OrdemDeServico,
  ): Promise<void> {
    await this.ordemDeServicoRepository.updateById(id, ordemDeServico);
  }

  @put('/ordem-de-servicos/{id}')
  @response(204, {
    description: 'OrdemDeServico PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ordemDeServico: OrdemDeServico,
  ): Promise<void> {
    await this.ordemDeServicoRepository.replaceById(id, ordemDeServico);
  }

  @del('/ordem-de-servicos/{id}')
  @response(204, {
    description: 'OrdemDeServico DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ordemDeServicoRepository.deleteById(id);
  }
}
