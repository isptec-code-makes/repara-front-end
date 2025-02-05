import {PagamentoLancamentoValidacao} from './pagamentoLancamentoValidacao';
import {BaseFilter} from "./filters/base-filter";


export interface Pagamento {
    id?: number;
    validacao?: PagamentoLancamentoValidacao;
    valorPago?: number | null;
    comprovativoFile?: string | null;
    comentario?: string | null;
    estado?: PagamentoEstado;
    dataPagamento?: string | null;
    createdOn?: string;
    metodo?: MetodoPagamento;
    referencia?: number | null;
    valorTotal?: number;

    //validacao: PagamentoValidacao | null;
    //cobrancas: Cobranca[];
}

export interface PagamentoFilter extends BaseFilter {

}

export enum MetodoPagamento {
    Cash = 1,
    Tranferencia,
    Deposito,
    TPA,
    Referencia,
    DebitoDirecto
}


export const MetodosPagamento: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Cash"
    },
    {
        id: 2,
        description: "Transferência Bancária"
    },
    {
        id: 3,
        description: "Depósito"
    },
    {
        id: 4,
        description: "TPA"
    },
    {
        id: 5,
        description: "Referência Multicaixa"
    },
    {
        id: 6,
        description: "Débito Directo"
    }
];

export function RetornaMetodosPagamento(id: number) {
    switch (id) {
        case 1:
            return MetodosPagamento[0];
            break;
        case 2:
            return MetodosPagamento[1];
            break;
        case 3:
            return MetodosPagamento[2];
            break;
        case 4:
            return MetodosPagamento[3];
            break;
        case 5:
            return MetodosPagamento[4];
            break;
        default:
            return null;
            break;
    }
}


export enum ModalidadePagamento {
    Mensal = 1,
    Trimestral,
    Semestral,
    Anual
}

export const ModalidadesPagamento: { id: number, description: string, quantidade: number }[] = [
    {
        id: 1,
        quantidade: 1,
        description: "Mensal"
    },
    {
        id: 2,
        description: "Trimestral",
        quantidade: 3

    },
    {
        id: 3,
        description: "Semestral",
        quantidade: 6
    },
    {
        id: 4,
        description: "Anual",
        quantidade: 12
    }
];

export function RetornaModalidadePagamento(id: number) {
    switch (id) {
        case 1:
            return ModalidadesPagamento[0];
            break;
        case 2:
            return ModalidadesPagamento[1];
            break;
        case 3:
            return ModalidadesPagamento[2];
            break;
        case 4:
            return ModalidadesPagamento[3];
            break;
        default:
            return null;
            break;
    }
}

export enum PagamentoEstado {
    Novo = 1,
    Pendente,
    Pago,
    Cancelado,
    Rejeitado,
    Vencido
}

export const EstadosPagamento: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Novo"
    },
    {
        id: 2,
        description: "Pendente"
    },
    {
        id: 3,
        description: "Pago"
    },
    {
        id: 4,
        description: "Cancelado"
    },
    {
        id: 5,
        description: "Rejeitado"
    },
    {
        id: 6,
        description: "Vencido"
    },
];

export function RetornaEstadoPagamento(id: number) {
    switch (id) {
        case 1:
            return EstadosPagamento[0];
            break;
        case 2:
            return EstadosPagamento[1];
            break;
        case 3:
            return EstadosPagamento[2];
            break;
        case 4:
            return EstadosPagamento[3];
        case 5:
            return EstadosPagamento[4];
            break;
        default:
            return 1;
            break;
    }
}

