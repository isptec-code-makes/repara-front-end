import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Solicitacao, SolicitacaoFilter } from '../types/solicitacao';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService<Solicitacao, SolicitacaoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'solicitacaos');
    }

    protected override attachHttpParams(filter: SolicitacaoFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
