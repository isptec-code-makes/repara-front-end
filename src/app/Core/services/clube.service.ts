import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Pessoa, PessoaFilter} from "../types/pessoa";
import {ClubeDto} from "../types/clube";

@Injectable({
    providedIn: 'root'
})
export class ClubeService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'clubes');
    }

    createWithFile(team: ClubeDto, logoFile?: File) {
        let formData = this.buildFormData(team, logoFile);

        return this.http
            .post<Pessoa>(
                `${this.apiUrl}${this.controller}/`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    updateWithFile(team: ClubeDto, logoFile?: File) {
        let formData = this.buildFormData(team, logoFile);

        return this.http
            .put<Pessoa>(
                `${this.apiUrl}${this.controller}/${team.id}`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    buildFormData(team: ClubeDto, logoFile?: File) {
        let formData = new FormData();

        if (team.nome != null)
            formData.append("nome", team.nome);

        if (team.sede != null)
            formData.append("sede", team.sede);

        if (team.nif != null)
            formData.append("nif", team.nif);

        if (team.nif != null)
            formData.append("entidade", team.entidade);

        if (logoFile != null) {
            formData.append('imagem', logoFile);
        }

        return formData;
    }

    protected override attachHttpParams(filter?: PessoaFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        /*
            if (filter?.id != null)
                params = params.append('id', filter.id);

            if (filter?.name != null)
                params = params.append('name', filter.name);

            if (filter?.value != null)
                params = params.append('value', filter.value);

            if (filter?.clientId != null)
                params = params.append('clientId', filter.clientId);
        */

        return params;
    }
}
