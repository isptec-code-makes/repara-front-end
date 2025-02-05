import {Genero} from "./genero";
import {NivelAcademico} from "./nivelAcademico";
import {PessoaOcupacao} from "./pessoaOcupacao";
import {DocumentoIdentificacaoTipo} from "./documentoIdentificacaoTipo";
import {EstadoCivil} from "./estadoCivil";
import {PessoaTipo} from "./pessoa";

export interface PessoaCreateRequestDto {
    codigo: number | null;
    nif: string | null;
    nome: string;
    apelido: string;
    nacionalidade: string | null;
    nomeDoPai: string | null;
    nomeDaMae: string | null;
    genero: Genero;
    morada: string;
    bairro: string | null;
    municipio: string | null;
    provincia: string | null;
    pais: string;
    fotografiaFile: any | null;
    nivelAcademico: NivelAcademico | null;
    ocupacao: PessoaOcupacao;
    numeroDocumentoIdentificacao: string | null;
    tipoDocumentoIdentificacao: DocumentoIdentificacaoTipo | null;
    documentoIdentificacaoFile: any | null;
    validadeDocumento: any | null;
    dataDeNascimento: any;
    pessoaTipo?: PessoaTipo;
    estadoCivil: EstadoCivil | null;
    email: string | null;
    codPais: string;
    numeroTelemovel: string;
    password: string;
    confirmPassword: string;

    whatsapp?: string | null;
    facebook?: string | null;
    instagram?: string | null;

    contactoPreferencia?: string;
}
