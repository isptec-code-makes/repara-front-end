import {BaseFilter} from "./filters/base-filter";
import {Contacto} from "./contacto";


export interface Mensagem {
    id: number;
    contactoId: number;
    contacto?: Contacto;
    userId: string;
    conteudo: string;
    assunto: string | null;
    estado: MensagemEstado;
    createdOn: string;
}

export interface SendMessageToGrupo {
    contactoGrupoId: number;
    message: string;
    subject: string | null;
}

export interface SendMessageToContact {
    contactoId: number;
    message: string;
    subject: string | null;
}


export interface IMensagemFilter extends BaseFilter {
    estado?: MensagemEstado
}

export enum MensagemEstado {
    Pendente = 1,
    Enviada,
    Falha
}


export const MensagemsEstado: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Pendente"
    },
    {
        id: 2,
        description: "Enviada"
    }, {
        id: 3,
        description: "Falha"
    }
];

export function RetornaMensagemEstado(id: number) {
    switch (id) {
        case 1:
            return MensagemsEstado[0];
        case 2:
            return MensagemsEstado[1];
        case 3:
            return MensagemsEstado[2];
        default:
            return MensagemsEstado[1];
    }
}