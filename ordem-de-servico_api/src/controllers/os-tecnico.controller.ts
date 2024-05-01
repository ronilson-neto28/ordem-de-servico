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
  Tecnico,
} from '../models';
import {OsRepository} from '../repositories';

export class OsTecnicoController {
  constructor(
    @repository(OsRepository)
    public osRepository: OsRepository,
  ) { }

  @get('/os/{id}/tecnico', {
    responses: {
      '200': {
        description: 'Tecnico belonging to Os',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tecnico),
          },
        },
      },
    },
  })
  async getTecnico(
    @param.path.number('id') id: typeof Os.prototype.id,
  ): Promise<Tecnico> {
    return this.osRepository.tecnicoOs(id);
  }
}
