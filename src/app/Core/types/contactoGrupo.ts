import {BaseFilter} from "./filters/base-filter";
import {ContactoTipo} from "./contacto";


export interface ContactoGrupo {
    id?: number;
    createdOn?: any;
    contactoTipo?: number;
    nome?: string;
    activo?: boolean | null;
}

export interface ContactoGrupoFilter extends BaseFilter {
    contactoTipo?: ContactoTipo,
    nome?: string,
    activo?: boolean
}
