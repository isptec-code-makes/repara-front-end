import { Equipamento } from './equipamento';
import { BaseFilter } from './filters/base-filter';
import { Servico } from './servico';

export interface Diagnostico extends Servico {
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    equipamentoId?: number;
    equipamento?: Equipamento;
}

export interface DiagnosticoFilter extends BaseFilter {}
