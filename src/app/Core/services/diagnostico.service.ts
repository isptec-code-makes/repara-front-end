import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Diagnostico, DiagnosticoFilter } from '../types/diagnostico';

@Injectable({
    providedIn: 'root'
})
export class DiagnosticoService extends BaseService<Diagnostico, DiagnosticoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'diagnosticos');
    }

    protected override attachHttpParams(filter: DiagnosticoFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
