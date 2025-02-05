import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AgregadoFamiliarFilter} from "../types/agregadoFamiliar";

@Injectable({
    providedIn: 'root'
})
export class AgregadoFamiliarService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'agregado-familiar');
    }

    protected override attachHttpParams(filter?: AgregadoFamiliarFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter?.pessoaId != null)
            params = params.append('pessoaId', filter.pessoaId);

        return params;
    }
}
