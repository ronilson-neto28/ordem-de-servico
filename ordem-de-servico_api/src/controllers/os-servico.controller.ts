import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Os,
  Servico,
} from '../models';
import {OsRepository} from '../repositories';

export class OsServicoController {
  constructor(
    @repository(OsRepository) protected osRepository: OsRepository,
  ) { }

  @get('/os/{id}/servicos', {
    responses: {
      '200': {
        description: 'Array of Os has many Servico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Servico>,
  ): Promise<Servico[]> {
    return this.osRepository.servicosOs(id).find(filter);
  }

  @post('/os/{id}/servicos', {
    responses: {
      '200': {
        description: 'Os model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Os.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servico, {
            title: 'NewServicoInOs',
            exclude: ['id'],
            optional: ['osId']
          }),
        },
      },
    }) servico: Omit<Servico, 'id'>,
  ): Promise<Servico> {
    return this.osRepository.servicosOs(id).create(servico);
  }

  @patch('/os/{id}/servicos', {
    responses: {
      '200': {
        description: 'Os.Servico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servico, {partial: true}),
        },
      },
    })
    servico: Partial<Servico>,
    @param.query.object('where', getWhereSchemaFor(Servico)) where?: Where<Servico>,
  ): Promise<Count> {
    return this.osRepository.servicosOs(id).patch(servico, where);
  }

  @del('/os/{id}/servicos', {
    responses: {
      '200': {
        description: 'Os.Servico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Servico)) where?: Where<Servico>,
  ): Promise<Count> {
    return this.osRepository.servicosOs(id).delete(where);
  }
}
