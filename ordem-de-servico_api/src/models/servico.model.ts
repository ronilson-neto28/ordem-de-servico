import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ModeloDispositivo} from './modelo-dispositivo.model';

@model()
export class Servico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  descricao?: string;

  @property({
    type: 'number',
    required: true,
  })
  custo: number;

  @belongsTo(() => ModeloDispositivo, {name: 'servicoModeloDispositivo'})
  modeloDispositivoId: number;

  @property({
    type: 'number',
  })
  osId?: number;

  constructor(data?: Partial<Servico>) {
    super(data);
  }
}

export interface ServicoRelations {
  // describe navigational properties here
}

export type ServicoWithRelations = Servico & ServicoRelations;
