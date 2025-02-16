import { BaseFilter } from './filters/base-filter';
import { EnumData } from '../interfaces/EnumData';

export interface Solicitacao {
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    clienteId?: number;
    prioridade?: SolicitacaoPrioridade;
    funcionarioId?: number;
    estado?: SolicitacaoEstado;
    descricaoProblema?: string;
    dataEntrega?: string;
    preco?: number;
    estagios?: string;
}

export interface SolicitacaoFilter extends BaseFilter {}

export enum SolicitacaoPrioridade {
    Baixa = 1,
    Media,
    Alta
}

export const SolicitacaoPrioridades: Array<EnumData> = [
    { id: SolicitacaoPrioridade.Baixa, description: 'Baixa' },
    { id: SolicitacaoPrioridade.Media, description: 'Média' },
    { id: SolicitacaoPrioridade.Alta, description: 'Alta' }
];

export function RetornaSolicitacaoPrioridade(id: number) {
    return SolicitacaoPrioridades.find((g) => g.id === id) ?? null;
}

export enum SolicitacaoEstado {
    Pendente = 1,
    Andamento,
    Concluido,
    Entregue
}

export const SolicitacaoEstados: Array<EnumData> = [
    { id: SolicitacaoEstado.Pendente, description: 'Pendente' },
    { id: SolicitacaoEstado.Andamento, description: 'Andamento' },
    { id: SolicitacaoEstado.Concluido, description: 'Concluído' },
    { id: SolicitacaoEstado.Entregue, description: 'Entregue' }
];

export function RetornaSolicitacaoEstado(id: number) {
    return SolicitacaoEstados.find((g) => g.id === id) ?? null;
}
