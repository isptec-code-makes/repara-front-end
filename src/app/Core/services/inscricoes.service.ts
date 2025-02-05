import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {InscricaoFilter} from "../types/inscricao";

@Injectable({
    providedIn: 'root'
})
export class InscricoesService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'inscricoes');
    }

    protected override attachHttpParams(filter?: InscricaoFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter?.pessoaId != null)
            params = params.append('pessoaId', filter.pessoaId);
        /*

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
