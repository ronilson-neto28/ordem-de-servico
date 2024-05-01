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
  Tecnico,
  ContatoTecnico,
} from '../models';
import {TecnicoRepository} from '../repositories';

export class TecnicoContatoTecnicoController {
  constructor(
    @repository(TecnicoRepository) protected tecnicoRepository: TecnicoRepository,
  ) { }

  @get('/tecnicos/{id}/contato-tecnicos', {
    responses: {
      '200': {
        description: 'Array of Tecnico has many ContatoTecnico',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ContatoTecnico)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ContatoTecnico>,
  ): Promise<ContatoTecnico[]> {
    return this.tecnicoRepository.contatoTecnicos(id).find(filter);
  }

  @post('/tecnicos/{id}/contato-tecnicos', {
    responses: {
      '200': {
        description: 'Tecnico model instance',
        content: {'application/json': {schema: getModelSchemaRef(ContatoTecnico)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tecnico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoTecnico, {
            title: 'NewContatoTecnicoInTecnico',
            exclude: ['id'],
            optional: ['tecnicoId']
          }),
        },
      },
    }) contatoTecnico: Omit<ContatoTecnico, 'id'>,
  ): Promise<ContatoTecnico> {
    return this.tecnicoRepository.contatoTecnicos(id).create(contatoTecnico);
  }

  @patch('/tecnicos/{id}/contato-tecnicos', {
    responses: {
      '200': {
        description: 'Tecnico.ContatoTecnico PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ContatoTecnico, {partial: true}),
        },
      },
    })
    contatoTecnico: Partial<ContatoTecnico>,
    @param.query.object('where', getWhereSchemaFor(ContatoTecnico)) where?: Where<ContatoTecnico>,
  ): Promise<Count> {
    return this.tecnicoRepository.contatoTecnicos(id).patch(contatoTecnico, where);
  }

  @del('/tecnicos/{id}/contato-tecnicos', {
    responses: {
      '200': {
        description: 'Tecnico.ContatoTecnico DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ContatoTecnico)) where?: Where<ContatoTecnico>,
  ): Promise<Count> {
    return this.tecnicoRepository.contatoTecnicos(id).delete(where);
  }
}
