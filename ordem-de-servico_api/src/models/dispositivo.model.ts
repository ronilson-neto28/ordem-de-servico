import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {ModeloDispositivo} from './modelo-dispositivo.model';

@model()
export class Dispositivo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  imei?: string;

  @belongsTo(() => Cliente, {name: 'clienteDispositivo'})
  clienteId: number;

  @belongsTo(() => ModeloDispositivo)
  modeloDispositivoId: number;

  constructor(data?: Partial<Dispositivo>) {
    super(data);
  }
}

export interface DispositivoRelations {
  // describe navigational properties here
}

export type DispositivoWithRelations = Dispositivo & DispositivoRelations;
