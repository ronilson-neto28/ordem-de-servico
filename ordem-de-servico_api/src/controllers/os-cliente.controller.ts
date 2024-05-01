import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Os,
  Cliente,
} from '../models';
import {OsRepository} from '../repositories';

export class OsClienteController {
  constructor(
    @repository(OsRepository)
    public osRepository: OsRepository,
  ) { }

  @get('/os/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Os',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Os.prototype.id,
  ): Promise<Cliente> {
    return this.osRepository.clienteOs(id);
  }
}
