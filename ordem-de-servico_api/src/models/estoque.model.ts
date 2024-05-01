import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ModeloDispositivo} from './modelo-dispositivo.model';

@model()
export class Estoque extends Entity {
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
  produto: string;

  @property({
    type: 'number',
    required: true,
  })
  custo: number;

  @property({
    type: 'number',
    required: true,
  })
  quantidade: number;

  @belongsTo(() => ModeloDispositivo, {name: 'modeloDispositivoEstoque'})
  modeloDispositivoId: number;

  constructor(data?: Partial<Estoque>) {
    super(data);
  }
}

export interface EstoqueRelations {
  // describe navigational properties here
}

export type EstoqueWithRelations = Estoque & EstoqueRelations;
