import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Equipamento, EquipamentoFilter } from '../types/equipamento';
import { Diagnostico } from '../types/diagnostico';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipamentoService extends BaseService<Equipamento, EquipamentoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'equipamentos');
    }

    public getDiagnostico(id: number): Observable<Diagnostico> {
        return this.http.get<Diagnostico>(`${this.apiUrl}${this.controller}/${id}/diagnostico`);
    }

    protected override attachHttpParams(filter: EquipamentoFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
