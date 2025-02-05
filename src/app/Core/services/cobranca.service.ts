import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";

import {CobrancaFilter, CobrancaGroupBy, PessoaQuotas} from "../types/cobranca";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CobrancaService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'cobrancas');
    }

    public getLancamentosEstatistica(pessoaId: number): Observable<PessoaQuotas> {

        return this.http.get<PessoaQuotas>(`${this.apiUrl}${this.controller}/estatistica/${pessoaId}`);
    }

    public getCobrancaGroupBy(): Observable<Array<CobrancaGroupBy>> {

        return this.http.get<Array<CobrancaGroupBy>>(`${this.apiUrl}${this.controller}/groupByEstado`);
    }

    protected override attachHttpParams(filter?: CobrancaFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();


        if (filter.pessoaId != null)
            params = params.append("pessoaId", filter.pessoaId);

        if (filter.inscricaoId != null)
            params = params.append("inscricaoId", filter.inscricaoId);

        if (filter.estado != null)
            params = params.append("estado", filter.estado);

        if (filter.pagamentoId != null)
            params = params.append("pagamentoId", filter.pagamentoId);

        if (filter.periodo != null)
            params = params.append("periodo", filter.periodo);


        if (filter.modalidade != null)
            params = params.append("modalidade", filter.modalidade);

        if (filter.isJoia != null)
            params = params.append("isJoia", filter.isJoia);


        return params;
    }
}
