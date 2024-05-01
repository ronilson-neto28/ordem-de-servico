import {Entity, model, property} from '@loopback/repository';

@model()
export class ContatoTecnico extends Entity {
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
  telefone: string;

  @property({
    type: 'number',
  })
  tecnicoId?: number;

  constructor(data?: Partial<ContatoTecnico>) {
    super(data);
  }
}

export interface ContatoTecnicoRelations {
  // describe navigational properties here
}

export type ContatoTecnicoWithRelations = ContatoTecnico & ContatoTecnicoRelations;
