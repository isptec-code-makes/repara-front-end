
import {BaseFilter} from "./filters/base-filter";



export interface Cliente{
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    userId?: string;
    nome?: string;
    endereco?: string;
    telefone?: string;
    email?: string;
}

export interface ClienteFilter extends BaseFilter {
   
}