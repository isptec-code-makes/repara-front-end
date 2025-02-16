import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Solicitacao, SolicitacaoFilter } from '../types/solicitacao';
import { Equipamento, EquipamentoFilter } from '../types/equipamento';
import { GetAllResponde } from '../types/getAllResponde';
import { catchError, distinctUntilChanged, map, Observable, retry } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService<Solicitacao, SolicitacaoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'solicitacaos');
    }

    public getEquipamentos(id: number, EquipamentoFilter: EquipamentoFilter): Observable<GetAllResponde<Equipamento>> {
        let params: HttpParams;

        params = this.attachHttpParams(EquipamentoFilter);

        return this.http
            .get<Equipamento[]>(`${this.apiUrl}${this.controller}/${id}`, {
                params: params,
                observe: 'response'
            })
            .pipe(
                map((response) => {
                    const pagination = response.headers.get('X-Pagination');
                    let totalCount = 0;
                    let pageSize = 0;
                    let currentPage = 0;
                    if (pagination) {
                        const paginationData = JSON.parse(pagination);
                        totalCount = Number(paginationData.TotalCount);
                        pageSize = Number(paginationData.PageSize);
                        currentPage = Number(paginationData.CurrentPage);
                    }
                    return {
                        data: response.body ?? [],
                        totalCount: totalCount,
                        pageSize: pageSize,
                        currentPage: currentPage
                    };
                }),
                distinctUntilChanged(),
                retry(this.httpRequestRetry),
                catchError(this.handleError.bind(this))
            );
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
