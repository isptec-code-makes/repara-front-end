import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PecaPedido, PecaPedidoFilter } from '../types/peca-pedido';

@Injectable({
    providedIn: 'root'
})
export class PecaPedidoService extends BaseService<PecaPedido, PecaPedidoFilter> {
    constructor(protected override http: HttpClient) {
        super(http, 'peca-pedidos');
    }

    protected override attachHttpParams(filter: PecaPedidoFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }
}
