import {Entity, model, property, hasMany} from '@loopback/repository';
import {ContatoTecnico} from './contato-tecnico.model';

@model()
export class Tecnico extends Entity {
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
    type: 'string',
    required: true,
  })
  cpf: string;

  @hasMany(() => ContatoTecnico)
  contatoTecnicos: ContatoTecnico[];

  constructor(data?: Partial<Tecnico>) {
    super(data);
  }
}

export interface TecnicoRelations {
  // describe navigational properties here
}

export type TecnicoWithRelations = Tecnico & TecnicoRelations;
