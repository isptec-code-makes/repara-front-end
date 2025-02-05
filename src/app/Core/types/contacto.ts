import {Pessoa} from "./pessoa";
import {BaseFilter} from "./filters/base-filter";


export interface Contacto {
    contactoTipo?: ContactoTipo;
    pessoaId?: number;
    pessoa?: Pessoa;
    valor?: string;
    verificado?: boolean;
    id?: number;
    createdOn?: string;
}

export interface ContactoFilter extends BaseFilter {
    contactoGrupoId?: number,
    contacto?: string,
    pessoaId?: number,
    contactoTipo?: ContactoTipo
}

export enum ContactoTipo {
    Telemovel = 1,
    Email,
    Whatsapp,
    Facebook,
    Instagram
}

export const ContactosTipo: { id: number, description: string }[] = [
    {
        id: 1,
        description: "SMS"
    }, {
        id: 2,
        description: "EMAIL"
    },

    /*{
        id: 3,
        description: "Whatsapp"
    }, */
];

export function RetornaContactoTipo(id: number) {
    switch (id) {
        case 1:
            return ContactosTipo[0];
        case 2:
            return ContactosTipo[1];
        default:
            return ContactosTipo[0];
    }
}


