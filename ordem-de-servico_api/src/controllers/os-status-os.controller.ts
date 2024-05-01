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
  StatusOs,
} from '../models';
import {OsRepository} from '../repositories';

export class OsStatusOsController {
  constructor(
    @repository(OsRepository)
    public osRepository: OsRepository,
  ) { }

  @get('/os/{id}/status-os', {
    responses: {
      '200': {
        description: 'StatusOs belonging to Os',
        content: {
          'application/json': {
            schema: getModelSchemaRef(StatusOs),
          },
        },
      },
    },
  })
  async getStatusOs(
    @param.path.number('id') id: typeof Os.prototype.id,
  ): Promise<StatusOs> {
    return this.osRepository.statusOs(id);
  }
}
