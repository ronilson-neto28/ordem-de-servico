import {Entity, model, property} from '@loopback/repository';

@model()
export class Aparelho extends Entity {
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
  imei: string;

  @property({
    type: 'string',
    required: true,
  })
  cor: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  tela: boolean;


  constructor(data?: Partial<Aparelho>) {
    super(data);
  }
}

export interface AparelhoRelations {
  // describe navigational properties here
}

export type AparelhoWithRelations = Aparelho & AparelhoRelations;
