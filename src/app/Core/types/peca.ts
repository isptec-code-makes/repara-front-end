import { BaseFilter } from './filters/base-filter';
import { EnumData } from '../interfaces/EnumData';

export interface Peca {
    id?: number;
    designacao?: string;
    preco?: number;
    modelo?: string;
    marca?: string;
    categoria?: EquipamentoCategoria;
    estoque?: number;
}

export interface PecaFilter extends BaseFilter {}

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
