import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Montagem, MontagemFilter } from '../types/montagem';

@Injectable({
    providedIn: 'root'
})
export class MontagemService extends BaseService<Montagem, MontagemFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'montagems');
    }

    protected override attachHttpParams(filter: MontagemFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
