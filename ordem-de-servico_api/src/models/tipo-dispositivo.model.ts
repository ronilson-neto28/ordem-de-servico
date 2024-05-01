import {Entity, model, property, hasMany} from '@loopback/repository';
import {ModeloDispositivo} from './modelo-dispositivo.model';

@model()
export class TipoDispositivo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @hasMany(() => ModeloDispositivo)
  modeloDispositivos: ModeloDispositivo[];

  constructor(data?: Partial<TipoDispositivo>) {
    super(data);
  }
}

export interface TipoDispositivoRelations {
  // describe navigational properties here
}

export type TipoDispositivoWithRelations = TipoDispositivo & TipoDispositivoRelations;
