import {BaseFilter} from "./filters/base-filter";
import {Pessoa} from "./pessoa";
import {Inscricao} from "./inscricao";
import {ModalidadePagamento, Pagamento, PagamentoEstado} from './pagamento';


export interface Cobranca {
    id?: number,
    createdOn?: string,
    inscricaoId?: number;
    inscricao?: Inscricao,
    periodo?: string;
    modalidade?: ModalidadePagamento;
    desconto?: number;
    montante?: number;
    comentario?: string | null;
    isJoia?: boolean;
    estado?: PagamentoEstado;
    pessoa?: Pessoa,
    pagamentoId?: number | null;
    pagamento?: Pagamento
}

export interface PessoaQuotas {
    quotasAcomuladas: number;
    quotasInterrompidas: number;
}

export interface CobrancaGroupBy {
    label: string;
    count: number;
    sum: number;
}

export interface CobrancaFilter extends BaseFilter {
    inscricaoId?: number,
    pessoaId?: number,
    pagamentoId?: number,
    periodo?: string,
    modalidade?: ModalidadePagamento,
    estado?: PagamentoEstado,
    isJoia?: boolean
}

