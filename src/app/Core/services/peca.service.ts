import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Peca, PecaFilter } from '../types/peca';

@Injectable({
    providedIn: 'root'
})
export class PecaService extends BaseService<Peca, PecaFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'pecas');
    }

    protected override attachHttpParams(filter: PecaFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
