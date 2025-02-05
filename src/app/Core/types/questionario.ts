import {BaseFilter} from "./filters/base-filter";
import {TipoPerguntaInquerito} from "./inquerito";


export interface Questionario {
    id?: number;
    createdOn?: string;
    questao?: string | null;
    possiveisValores?: Array<string> | null;
    limiteEscolhas?: number | null;
    questionarioTipo?: TipoPerguntaInquerito;

}

export interface QuestionariFilter extends BaseFilter {

}




