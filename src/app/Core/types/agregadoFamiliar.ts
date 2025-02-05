import {GrauParentesco} from './grauParentesco';
import {BaseFilter} from "./filters/base-filter";


export interface AgregadoFamiliar {
    id?: number;
    createdOn?: string;
    pessoaId?: number;
    nome?: string | null;
    apelido?: string | null;
    morada?: string | null;
    dataDeNascimento?: string;
    grauParentesco?: GrauParentesco;
}

export interface AgregadoFamiliarFilter extends BaseFilter {
    pessoaId?: number
}


export namespace AgregadoFamiliar {
}


