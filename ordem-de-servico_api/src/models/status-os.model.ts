import {Entity, model, property} from '@loopback/repository';

@model()
export class StatusOs extends Entity {
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


  constructor(data?: Partial<StatusOs>) {
    super(data);
  }
}

export interface StatusOsRelations {
  // describe navigational properties here
}

export type StatusOsWithRelations = StatusOs & StatusOsRelations;
