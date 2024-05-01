import {Entity, model, property} from '@loopback/repository';

@model()
export class ModeloDispositivo extends Entity {
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

  @property({
    type: 'number',
  })
  tipoDispositivoId?: number;

  constructor(data?: Partial<ModeloDispositivo>) {
    super(data);
  }
}

export interface ModeloDispositivoRelations {
  // describe navigational properties here
}

export type ModeloDispositivoWithRelations = ModeloDispositivo & ModeloDispositivoRelations;
