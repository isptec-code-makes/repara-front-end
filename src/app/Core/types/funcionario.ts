import { BaseFilter } from './filters/base-filter';

export interface Funcionario {
    id?: number;
    createdOn?: string;
    updatedOn?: string;
    userId?: string | null;
    nome?: string;
    email?: string;
    telefone?: string;
    ocupado?: boolean;
    horarioTrabalho?: string | null;
    especialidades?: string;
}

export interface FuncionarioFilter extends BaseFilter {}
