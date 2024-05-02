import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Tecnico} from './tecnico.model';
import {Cliente} from './cliente.model';
import {Dispositivo} from './dispositivo.model';
import {StatusOs} from './status-os.model';
import {Servico} from './servico.model';

@model()
export class Os extends Entity {
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
  dataSaida: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'boolean',
  })
  telaDisplay?: boolean;

  @property({
    type: 'boolean',
  })
  touchScreen?: boolean;

  @property({
    type: 'boolean',
  })
  sensorProximidade?: boolean;

  @property({
    type: 'boolean',
  })
  bluetooth?: boolean;

  @property({
    type: 'boolean',
  })
  ligacao?: boolean;

  @property({
    type: 'boolean',
  })
  wifi?: boolean;

  @property({
    type: 'boolean',
  })
  altoFalante?: boolean;

  @property({
    type: 'boolean',
  })
  touchId?: boolean;

  @property({
    type: 'boolean',
  })
  botaoPower?: boolean;

  @property({
    type: 'boolean',
  })
  audioAuricular?: boolean;

  @property({
    type: 'boolean',
  })
  microfone?: boolean;

  @property({
    type: 'boolean',
  })
  cameraFrontal?: boolean;

  @property({
    type: 'boolean',
  })
  cameraTraseira?: boolean;

  @property({
    type: 'boolean',
  })
  botaoVolume?: boolean;

  @property({
    type: 'boolean',
  })
  conectorFone?: boolean;

  @property({
    type: 'boolean',
  })
  dock?: boolean;

  @property({
    type: 'boolean',
  })
  faceId?: boolean;

  @property({
    type: 'boolean',
  })
  carregamentoInducao?: boolean;

  @property({
    type: 'number',
  })
  saudeBateria?: number;

  @property({
    type: 'string',
  })
  senhaTela?: string;

  @property({
    type: 'string',
  })
  defeito?: string;

  @belongsTo(() => Tecnico, {name: 'tecnicoOs'})
  tecnicoId: number;

  @belongsTo(() => Cliente, {name: 'clienteOs'})
  clienteId: number;

  @belongsTo(() => Dispositivo, {name: 'dispositivoOs'})
  dispositivoId: number;

  @belongsTo(() => StatusOs)
  statusOsId: number;

  @hasMany(() => Servico)
  servicosOs: Servico[];

  constructor(data?: Partial<Os>) {
    super(data);
  }
}

export interface OsRelations {
  // describe navigational properties here
}

export type OsWithRelations = Os & OsRelations;
