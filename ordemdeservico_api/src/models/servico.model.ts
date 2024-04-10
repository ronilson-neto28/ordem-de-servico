import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  descricao: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;


  constructor(data?: Partial<Servico>) {
    super(data);
  }
}

export interface ServicoRelations {
  // describe navigational properties here
}

export type ServicoWithRelations = Servico & ServicoRelations;
