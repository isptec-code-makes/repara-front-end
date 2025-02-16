import { Peca } from './peca';
import { Montagem } from './montagem';
import { BaseFilter } from './filters/base-filter';

export interface PecaPedido {
    preco: number | null;
    pecaId: number;
    peca: Peca;
    montagem: Montagem;
    montagemId: number;
    dateProcessed: string | null;
    estado: PecaPedidoEstado;
}

export interface PecaPedidoFilter extends BaseFilter {}

export enum PecaPedidoEstado {
    Pendente = 1,
    Aprovado,
    Reprovado
}

export const PecaPedidoEstados: Array<{ id: PecaPedidoEstado; description: string }> = [
    { id: PecaPedidoEstado.Pendente, description: 'Pendente' },
    { id: PecaPedidoEstado.Aprovado, description: 'Aprovado' },
    { id: PecaPedidoEstado.Reprovado, description: 'Reprovado' }
];

export function RetornaPecaPedidoEstado(id: number) {
    return PecaPedidoEstados.find((g) => g.id === id) ?? null;
}
