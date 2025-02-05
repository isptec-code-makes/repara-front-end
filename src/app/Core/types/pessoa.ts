import {User} from './user';
import {QuestionarioResposta} from './questionarioResposta';
import {AgregadoFamiliar} from './agregadoFamiliar';
import {Inscricao} from "./inscricao";
import {BaseFilter} from "./filters/base-filter";
import {EnumData} from "../interfaces/EnumData";


export enum PessoaTipo {
    Adepto = 1,
    Socio
}

export interface Pessoa {
    id?: number;
    userId?: string | null;
    codigo?: string | null;
    guid?: string;
    nome?: string | null;
    apelido?: string | null;
    nacionalidade?: string | null;
    genero?: Genero;
    morada?: string | null;
    bairro?: string | null;
    municipio?: string | null;
    provincia?: string | null;
    pais?: string | null;
    fotografia?: string | null;
    nivelAcademico?: NivelAcademico;
    ocupacao?: PessoaOcupacao;
    numeroDocumentoIdentificacao?: string | null;
    tipoDocumentoIdentificacao?: DocumentoIdentificacaoTipo;
    documentoIdentificacaoFile?: string | null;
    validadeDocumento?: string | null;
    dataDeNascimento?: string;
    pessoaTipo?: PessoaTipo;
    estadoCivil?: EstadoCivil;

    fotografiaFile?: string | null;

    user?: User;
    nif?: string | null;
    nomeDoPai?: string | null;
    nomeDaMae?: string | null;
    email?: string | null;
    codPais?: number | null;
    numeroTelemovel?: string | null;
    agregadoFamiliar?: Array<AgregadoFamiliar> | null;
    inqueritos?: Array<QuestionarioResposta> | null;
    inscricoes?: Array<Inscricao> | null;
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    password?: string;
    confirmPassword?: string;
    contactoPreferencia?: string;
    createdOn?: string;
}

export interface PessoaGroupByData {
    provincias: (string | null)[];
    municipios: (string | null)[];
    nacionalidades: (string | null)[];
    paises: (string | null)[];
}

export interface PessoaFilter extends BaseFilter {
    guid?: string | null;
    codigo?: string | null;
    nome?: string | null;
    apelido?: string | null;

    nacionalidade?: string | null;
    morada?: string | null;
    bairro?: string | null;
    municipio?: string | null;
    provincia?: string | null;
    pais?: string | null;
    numeroDocumentoIdentificacao?: string | null;
    genero?: Genero | null;
    nivelAcademico?: NivelAcademico | null;
    ocupacao?: PessoaOcupacao | null;
    tipoDocumentoIdentificacao?: DocumentoIdentificacaoTipo | null;
    validadeDocumento?: string | null;
    dataDeNascimento?: string | null;
    pessoaTipo?: PessoaTipo | null;
    estadoCivil?: EstadoCivil | null;
    aniversario?: Aniversario;
}


export const pessoaTipos: { id: number, description: string }[] = [
    {
        id: 1,
        description: 'Adepto'
    },
    {
        id: 2,
        description: 'Sócio'
    }
]


export enum Genero {

    FEMININO = 1,
    MASCULINO,
}

export const Generos: Array<EnumData> = [
    {
        id: 1,
        description: "Feminino"
    },
    {
        id: 2,
        description: "Masculino"
    },
];

export function RetornaGenero(id: number) {
    switch (id) {
        case 1:
            return Generos[0];
            break;
        case 2:
            return Generos[1];
            break;
        default:
            return null;
            break;
    }
}


export enum NivelAcademico {
    Primario = 1,
    Medio,
    Licenciado,
    Mestrado,
    Doutorado
}

export const NiveisAcademicos: Array<EnumData> = [
    {
        id: 1,
        description: "Primário"
    },
    {
        id: 2,
        description: "Médio"
    },
    {
        id: 3,
        description: "Licenciado"
    },
    {
        id: 4,
        description: "Mestrado"
    },
    {
        id: 5,
        description: "Doutorado"
    }
];

export function RetornaNivelAcademico(id: number) {
    switch (id) {
        case 1:
            return NiveisAcademicos[0];
            break;
        case 2:
            return NiveisAcademicos[1];
            break;
        case 3:
            return NiveisAcademicos[2];
            break;
        case 4:
            return NiveisAcademicos[3];
            break;
        case 5:
            return NiveisAcademicos[4];
            break;
        default:
            return null;
            break;
    }
}

export enum DocumentoIdentificacaoTipo {
    BI = 1,
    Passaporte,
    CartaDeConducao,
    Cedula
}

export const TiposDocumentoIdentificacao: { id: number, description: string }[] = [
    {
        id: 1,
        description: "BI"
    },
    {
        id: 2,
        description: "Passaporte"
    },
    {
        id: 3,
        description: "Carta de condução"
    },
    {
        id: 4,
        description: "Cédula"
    }
];

export function RetornaTipoDocumentoIdentificacao(id: number) {
    switch (id) {
        case 1:
            return TiposDocumentoIdentificacao[0];
            break;
        case 2:
            return TiposDocumentoIdentificacao[1];
            break;
        case 3:
            return TiposDocumentoIdentificacao[2];
            break;
        case 4:
            return TiposDocumentoIdentificacao[3];
            break;
        default:
            return null;
            break;
    }
}

export enum PessoaOcupacao {
    Estudante = 1,
    FuncionarioPublico,
    ContraPropria,
    ContaDeOutrem,
    Reformado
}

export const Ocupacoes: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Estudante"
    },
    {
        id: 2,
        description: "Funcionário público"
    },
    {
        id: 3,
        description: "Contra propria"
    },
    {
        id: 4,
        description: "Conta de outrem"
    },
    {
        id: 5,
        description: "Reformado"
    }
];

export function RetornaOcupacao(id: number) {
    switch (id) {
        case 1:
            return Ocupacoes[0];
            break;
        case 2:
            return Ocupacoes[1];
            break;
        case 3:
            return Ocupacoes[2];
            break;
        case 4:
            return Ocupacoes[3];
            break;
        case 5:
            return Ocupacoes[4];
            break;
        default:
            return null;
            break;
    }
}

export enum EstadoCivil {
    Solterio = 1,
    Casado,
    Divorciado,
    Viuvo
}

export const EstadosCivis: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Solteiro(a)"
    },
    {
        id: 2,
        description: "Casado(a)"
    },
    {
        id: 3,
        description: "Divorciado(a)"
    },
    {
        id: 4,
        description: "Viuvo(a)"
    }
];

export function RetornaEstadoCivil(id: number) {
    switch (id) {
        case 1:
            return EstadosCivis[0];
            break;
        case 2:
            return EstadosCivis[1];
            break;
        case 3:
            return EstadosCivis[2];
            break;
        case 4:
            return EstadosCivis[3];
            break;
        default:
            return null;
            break;
    }
}


export enum Aniversario {
    HOJE = 0,
    JANEIRO,
    FEVEREIRO,
    MARCO,
    ABRIL,
    MAIO,
    JUNHO,
    JULHO,
    AGOSTO,
    SETEMBRO,
    OUTUBRO,
    NOVEMBRO,
    DEZEMBRO
}

export const Aniversarios: Array<EnumData> = [
    {
        id: 0,
        description: "Hoje"
    },
    {
        id: 1,
        description: "Janeiro"
    },
    {
        id: 2,
        description: "Fevereiro"
    },
    {
        id: 3,
        description: "Março"
    },
    {
        id: 4,
        description: "Abril"
    },
    {
        id: 5,
        description: "Maio"
    },
    {
        id: 6,
        description: "Junho"
    },
    {
        id: 7,
        description: "Julho"
    },
    {
        id: 8,
        description: "Agosto"
    },
    {
        id: 9,
        description: "Setembro"
    },
    {
        id: 10,
        description: "Outubro"
    },
    {
        id: 11,
        description: "Novembro"
    },
    {
        id: 12,
        description: "Dezembro"
    },
];

export function RetornaAniversarios(id: number) {
    return Aniversarios[id];
}

export interface PessoaImport {
    pessoas: Array<Pessoa>;
    ficheiro: string;
}
