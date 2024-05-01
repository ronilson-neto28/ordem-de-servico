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
  Cliente,
  ContatoC,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteContatoCController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/contato-cs', {
    responses: {
      '200': {
        description: 'Array of Cliente has many ContatoC',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContatoC)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContatoC>,
  ): Promise<ContatoC[]> {
    return this.clienteRepository.contatoCS(id).find(filter);
  }

  @post('/clientes/{id}/contato-cs', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContatoC)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoC, {
            title: 'NewContatoCInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) contatoC: Omit<ContatoC, 'id'>,
  ): Promise<ContatoC> {
    return this.clienteRepository.contatoCS(id).create(contatoC);
  }

  @patch('/clientes/{id}/contato-cs', {
    responses: {
      '200': {
        description: 'Cliente.ContatoC PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoC, {partial: true}),
        },
      },
    })
    contatoC: Partial<ContatoC>,
    @param.query.object('where', getWhereSchemaFor(ContatoC)) where?: Where<ContatoC>,
  ): Promise<Count> {
    return this.clienteRepository.contatoCS(id).patch(contatoC, where);
  }

  @del('/clientes/{id}/contato-cs', {
    responses: {
      '200': {
        description: 'Cliente.ContatoC DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContatoC)) where?: Where<ContatoC>,
  ): Promise<Count> {
    return this.clienteRepository.contatoCS(id).delete(where);
  }
}
