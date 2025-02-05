import {InscricaoValidacao} from "./inscricaoValidacao";
import {Pessoa} from "./pessoa";
import {Categoria} from "./categoria";
import {BaseFilter} from "./filters/base-filter";
import {MetodoPagamento, ModalidadePagamento, Pagamento} from "./pagamento";

export interface Inscricao {
    id?: number;
    pessoaId?: number;
    categoriaId?: number;
    comentario?: string | null;
    estado?: InscricaoEstado;
    dataAdmicao?: string | null;
    createdOn?: string;
    modalidade?: ModalidadePagamento;

    metodo?: MetodoPagamento;
    pessoa?: Pessoa;
    categoria?: Categoria;
    pagamentos?: Array<Pagamento>;
    validacao?: InscricaoValidacao;
}


export enum InscricaoEstado {
    Pendente = 1,
    Activo,
    Rejeitado,
    Suspenso
}

export const InscricaoEstados: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Pendente"
    },
    {
        id: 2,
        description: "Activo"
    },
    {
        id: 3,
        description: "Rejeitado"
    },
    {
        id: 4,
        description: "Suspenso"
    }
];

export function RetornaInscricaoEstado(id: number) {
    switch (id) {
        case 1:
            return InscricaoEstados[0];
        case 2:
            return InscricaoEstados[1];
        case 3:
            return InscricaoEstados[2];
        case 4:
            return InscricaoEstados[3];
        default:
            return null;
    }
}


export interface InscricaoFilter extends BaseFilter {
    pessoaId?: number,
}
