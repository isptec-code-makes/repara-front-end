import {BaseFilter} from "./filters/base-filter";


export interface QuestionarioResposta {
    id?: number;
    createdOn?: string;
    pessoaId?: number;
    questionarioId?: number;
    resposta?: string | null;
}

export interface QuestionarioRespostaFilter extends BaseFilter {
    pessoaId?: number,
    questionarioId?: number
}

export interface QuestionarioRespostaChart {
    categorias: string[];
    quantidades: number[];
}

