import {BaseFilter} from "./filters/base-filter";

export interface Inquerito {
    id?: number;
    questao?: string | null;
    possiveisValores?: Array<string> | null;
    limiteEscolhas?: number | null;
    questionarioTipo?: TipoPerguntaInquerito;
    placeholder?: string | null;
    obrigatorio?: boolean | null;
    createdOn?: string;
    tipo?: any;
    pergunta?: any;
}

export interface IInqueritoFilter extends BaseFilter {

}


export type TipoPerguntaInquerito = 1 | 2 | 3 | 4 | 5;

export const TipoPerguntaInquerito = {
    NUMBER_1: 1 as TipoPerguntaInquerito,
    NUMBER_2: 2 as TipoPerguntaInquerito,
    NUMBER_3: 3 as TipoPerguntaInquerito,
    NUMBER_4: 4 as TipoPerguntaInquerito,
    NUMBER_5: 5 as TipoPerguntaInquerito,
};

export const TiposPerguntaInquerito: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Números"
    },
    {
        id: 2,
        description: "Texto"
    },
    {
        id: 3,
        description: "Lista de seleção"
    },
    {
        id: 4,
        description: "Escolha única"
    },
    {
        id: 5,
        description: "Caixa de seleção"
    },
];

export function RetornaTiposPergunta(id: number) {
    switch (id) {
        case 1:
            return TiposPerguntaInquerito[0];
            break;
        case 2:
            return TiposPerguntaInquerito[1];
            break;
        case 3:
            return TiposPerguntaInquerito[2];
            break;
        default:
            return null;
            break;
    }
}

