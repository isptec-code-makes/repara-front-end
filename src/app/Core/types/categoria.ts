import {Inscricao} from "./inscricao";
import {BaseFilter} from "./filters/base-filter";


export interface Categoria {
    id?: number;
    createdOn?: string;
    quota?: number;
    joia?: number;
    designacao?: string | null;
    beneficios?: string | null;
    estado?: CategoriaEstado;
    inscricoes?: Array<Inscricao> | null;
}

export interface CategoriaFilter extends BaseFilter {
    estado?: CategoriaEstado
}

export enum CategoriaEstado {
    Activado = 1,
    Desactivado = 2
}

export const CategoriasEstado: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Activado"
    },
    {
        id: 2,
        description: "Desativado"
    }
];

export function RetornaCategoriaEstado(id: number) {
    switch (id) {
        case 1:
            return CategoriasEstado[0];
        case 2:
            return CategoriasEstado[1];
        default:
            return CategoriasEstado[1];
    }
}


export interface CategoriaPagamentoEstatistica {
    categoria: string;
    total: number;
}