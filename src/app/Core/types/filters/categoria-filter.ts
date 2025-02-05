import {BaseFilter} from "./base-filter";
import {PagamentoEstado} from "../pagamentoEstado";

export type categoriaFilter = BaseFilter & {
    estado?: PagamentoEstado;
};
