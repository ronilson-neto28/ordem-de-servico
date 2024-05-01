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
  TipoDispositivo,
  ModeloDispositivo,
} from '../models';
import {TipoDispositivoRepository} from '../repositories';

export class TipoDispositivoModeloDispositivoController {
  constructor(
    @repository(TipoDispositivoRepository) protected tipoDispositivoRepository: TipoDispositivoRepository,
  ) { }

  @get('/tipo-dispositivos/{id}/modelo-dispositivos', {
    responses: {
      '200': {
        description: 'Array of TipoDispositivo has many ModeloDispositivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ModeloDispositivo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ModeloDispositivo>,
  ): Promise<ModeloDispositivo[]> {
    return this.tipoDispositivoRepository.modeloDispositivos(id).find(filter);
  }

  @post('/tipo-dispositivos/{id}/modelo-dispositivos', {
    responses: {
      '200': {
        description: 'TipoDispositivo model instance',
        content: {'application/json': {schema: getModelSchemaRef(ModeloDispositivo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoDispositivo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModeloDispositivo, {
            title: 'NewModeloDispositivoInTipoDispositivo',
            exclude: ['id'],
            optional: ['tipoDispositivoId']
          }),
        },
      },
    }) modeloDispositivo: Omit<ModeloDispositivo, 'id'>,
  ): Promise<ModeloDispositivo> {
    return this.tipoDispositivoRepository.modeloDispositivos(id).create(modeloDispositivo);
  }

  @patch('/tipo-dispositivos/{id}/modelo-dispositivos', {
    responses: {
      '200': {
        description: 'TipoDispositivo.ModeloDispositivo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModeloDispositivo, {partial: true}),
        },
      },
    })
    modeloDispositivo: Partial<ModeloDispositivo>,
    @param.query.object('where', getWhereSchemaFor(ModeloDispositivo)) where?: Where<ModeloDispositivo>,
  ): Promise<Count> {
    return this.tipoDispositivoRepository.modeloDispositivos(id).patch(modeloDispositivo, where);
  }

  @del('/tipo-dispositivos/{id}/modelo-dispositivos', {
    responses: {
      '200': {
        description: 'TipoDispositivo.ModeloDispositivo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ModeloDispositivo)) where?: Where<ModeloDispositivo>,
  ): Promise<Count> {
    return this.tipoDispositivoRepository.modeloDispositivos(id).delete(where);
  }
}
