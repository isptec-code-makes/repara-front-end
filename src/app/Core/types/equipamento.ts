import { BaseFilter } from './filters/base-filter';
import { EnumData } from '../interfaces/EnumData';
import { Diagnostico } from './diagnostico';
import { Montagem } from './montagem';

export interface Equipamento {
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    categoria?: EquipamentoCategoria;
    solicitacaoId?: number;
    solicitacao?: string;
    diagnostico?: Diagnostico;
    marca?: string;
    modelo?: string;
    estagios?: string;
    montagens?: Array<Montagem>;
}

export interface EquipamentoFilter extends BaseFilter {
    solicitacaoId?: number;
}

export enum EquipamentoCategoria {
    CPU = 1,
    GPU,
    RAM,
    Motherboard,
    Storage
}

export const EquipamentoCategorias: Array<EnumData> = [
    { id: EquipamentoCategoria.CPU, description: 'CPU' },
    { id: EquipamentoCategoria.GPU, description: 'GPU' },
    { id: EquipamentoCategoria.RAM, description: 'RAM' },
    { id: EquipamentoCategoria.Motherboard, description: 'Motherboard' },
    { id: EquipamentoCategoria.Storage, description: 'Storage' }
];

export function RetornaEquipamentoCategoria(id: number) {
    return EquipamentoCategorias.find((g) => g.id === id) ?? null;
}
