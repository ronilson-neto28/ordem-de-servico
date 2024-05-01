import {Entity, model, property} from '@loopback/repository';

@model()
export class ContatoC extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  telefone?: string;

  @property({
    type: 'number',
  })
  clienteId?: number;

  constructor(data?: Partial<ContatoC>) {
    super(data);
  }
}

export interface ContatoCRelations {
  // describe navigational properties here
}

export type ContatoCWithRelations = ContatoC & ContatoCRelations;
