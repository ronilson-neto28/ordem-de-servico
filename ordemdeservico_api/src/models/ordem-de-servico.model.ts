import {Entity, model, property} from '@loopback/repository';

@model()
export class OrdemDeServico extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  dataEntrada: string;

  @property({
    type: 'date',
    required: true,
  })
  datasaida: string;


  constructor(data?: Partial<OrdemDeServico>) {
    super(data);
  }
}

export interface OrdemDeServicoRelations {
  // describe navigational properties here
}

export type OrdemDeServicoWithRelations = OrdemDeServico & OrdemDeServicoRelations;
