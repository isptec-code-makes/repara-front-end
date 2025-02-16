import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Equipamento, EquipamentoFilter } from '../types/equipamento';

@Injectable({
    providedIn: 'root'
})
export class EquipamentoService extends BaseService<Equipamento, EquipamentoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'equipamentos');
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
