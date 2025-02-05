import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pessoa, PessoaFilter, PessoaGroupByData, PessoaImport} from "../types/pessoa";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PessoaService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'pessoas');
    }

    confirmImport(file: string) {
        return this.http.get<PessoaImport>(
            `${this.apiUrl}${this.controller}/import/${file}`
        );
    }

    public groupByData(): Observable<PessoaGroupByData> {
        return this.http.get<PessoaGroupByData>(
            `${this.apiUrl}${this.controller}/groupByData`
        );
    }

    public getByInscricao(inscricaoId: number): Observable<Pessoa> {
        return this.http.get<Pessoa>(
            `${this.apiUrl}${this.controller}/inscricao/${inscricaoId}`
        );
    }

    public createPessoa(pessoa: Pessoa, documento: File | any, fotografia: File | any): Observable<Pessoa> {
        let formData = this.buildFormData(pessoa, documento, fotografia);
        return this.http
            .post<Pessoa>(
                `${this.apiUrl}${this.controller}/`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    public updatePessoa(pessoa: Pessoa, documento?: File | any, fotografia?: File | any): Observable<Pessoa> {
        let formData = this.buildFormData(pessoa, documento, fotografia);
        return this.http
            .patch<any>(
                `${this.apiUrl}${this.controller}/${pessoa.id}`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    public getExportedData(filter?: PessoaFilter): Observable<Blob> {
        let params: HttpParams;
        if (filter != null) {
            params = this.attachHttpParams(filter);
        } else {
            params = this.attachBaseHttpParamsForced(filter);
        }
        return this.http.get(`${this.apiUrl}${this.controller}/export`,
            {
                params: params,
                responseType: "blob"
            },
        );

    }

    private buildFormData(item: Pessoa, documento?: File, fotografia?: File): FormData {
        let formData = new FormData();

        if (item.codigo != null)
            formData.append("codigo", item.codigo.toString());

        if (item.userId != null)
            formData.append("userId", item.userId.toString());

        if (item.nome != null)
            formData.append("nome", item.nome);

        if (item.apelido != null)
            formData.append("apelido", item.apelido);

        if (item.nacionalidade != null)
            formData.append("nacionalidade", item.nacionalidade);

        if (item.genero != null)
            formData.append("genero", item.genero?.toString());

        if (item.morada != null)
            formData.append("morada", item.morada);

        if (item.bairro != null)
            formData.append("bairro", item.bairro);

        if (item.municipio != null)
            formData.append("municipio", item.municipio);

        if (item.provincia != null)
            formData.append("provincia", item.provincia);

        if (item.pais != null)
            formData.append("pais", item.pais);

        if (item.nivelAcademico != null)
            formData.append("nivelAcademico", item.nivelAcademico.toString());

        if (item.ocupacao != null)
            formData.append("ocupacao", item.ocupacao.toString());

        if (item.dataDeNascimento != null)
            formData.append("dataDeNascimento", item.dataDeNascimento);

        if (item.estadoCivil != null)
            formData.append("estadoCivil", item.estadoCivil.toString());

        if (item.numeroDocumentoIdentificacao != null)
            formData.append("numeroDocumentoIdentificacao", item.numeroDocumentoIdentificacao);

        if (item.tipoDocumentoIdentificacao != null)
            formData.append("tipoDocumentoIdentificacao", item.tipoDocumentoIdentificacao.toString());

        if (documento != null)
            formData.append("documentoIdentificacaoFile", documento, documento.name);

        if (item.validadeDocumento != null)
            formData.append("validadeDocumento", item.validadeDocumento);

        if (item.contactoPreferencia != null)
            formData.append("contactoPreferencia", item.contactoPreferencia);

        if (fotografia != null)
            formData.append("fotografiaFile", fotografia, fotografia.name);

        return formData;
    }

    protected override attachHttpParams(filter?: PessoaFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter.guid != null)
            params = params.append("guid", filter.guid);

        if (filter.codigo != null)
            params = params.append("codigo", filter.codigo);

        if (filter.nome != null)
            params = params.append("nome", filter.nome);

        if (filter.apelido != null)
            params = params.append("apelido", filter.apelido);

        if (filter.nacionalidade != null)
            params = params.append("nacionalidade", filter.nacionalidade);

        if (filter.morada != null)
            params = params.append("morada", filter.morada);

        if (filter.bairro != null)
            params = params.append("bairro", filter.bairro);

        if (filter.municipio != null)
            params = params.append("municipio", filter.municipio);

        if (filter.provincia != null)
            params = params.append("provincia", filter.provincia);

        if (filter.pais != null)
            params = params.append("pais", filter.pais);

        if (filter.numeroDocumentoIdentificacao != null)
            params = params.append("numeroDocumentoIdentificacao", filter.numeroDocumentoIdentificacao);

        if (filter.genero != null)
            params = params.append("genero", filter.genero);

        if (filter.nivelAcademico != null)
            params = params.append("nivelAcademico", filter.nivelAcademico);

        if (filter.ocupacao != null)
            params = params.append("ocupacao", filter.ocupacao);

        if (filter.tipoDocumentoIdentificacao != null)
            params = params.append("tipoDocumentoIdentificacao", filter.tipoDocumentoIdentificacao);

        if (filter.validadeDocumento != null)
            params = params.append("validadeDocumento", filter.validadeDocumento);

        if (filter.dataDeNascimento != null)
            params = params.append("dataDeNascimento", filter.dataDeNascimento);

        if (filter.pessoaTipo != null)
            params = params.append("pessoaTipo", filter.pessoaTipo);

        if (filter.estadoCivil != null)
            params = params.append("estadoCivil", filter.estadoCivil);

        if (filter.aniversario != null)
            params = params.append("aniversario", filter.aniversario);

        return params;
    }

}
