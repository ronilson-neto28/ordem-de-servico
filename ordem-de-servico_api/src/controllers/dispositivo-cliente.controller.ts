import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Dispositivo,
  Cliente,
} from '../models';
import {DispositivoRepository} from '../repositories';

export class DispositivoClienteController {
  constructor(
    @repository(DispositivoRepository)
    public dispositivoRepository: DispositivoRepository,
  ) { }

  @get('/dispositivos/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to Dispositivo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof Dispositivo.prototype.id,
  ): Promise<Cliente> {
    return this.dispositivoRepository.clienteDispositivo(id);
  }
}
