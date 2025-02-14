import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Funcionario, FuncionarioFilter } from '../types/funcionario';

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService extends BaseService<Funcionario, FuncionarioFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'funcionarios');
    }

    protected override attachHttpParams(filter: FuncionarioFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
