import {BaseFilter} from "./base-filter";
import {MetodoPagamento, ModalidadePagamento, PagamentoEstado} from "../pagamento";


export type clubeFilter = BaseFilter & {
    inscricaoId?: number | null;
    periodoInicio?: string | null;
    periodoFim?: string | null;
    vencimento?: string | null;
    metodoDePagamento?: MetodoPagamento | null;
    modalidade?: ModalidadePagamento | null;
    valorLancado?: number | null;
    valorOriginal?: number | null;
    referencia?: number | null;
    estado?: PagamentoEstado | null;
}
