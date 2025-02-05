import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CategoriaFilter, CategoriaPagamentoEstatistica} from "../types/categoria";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoriasService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'categorias');
    }

    public getCategoriaPagamentoEstatistica(): Observable<Array<CategoriaPagamentoEstatistica>> {
        return this.http.get<Array<CategoriaPagamentoEstatistica>>(
            `${this.apiUrl}${this.controller}/pagamentosEstatistica`
        );
    }

    protected override attachHttpParams(filter?: CategoriaFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();


        if (filter.estado != null)
            params = params.append('estado', filter.estado);

        return params;
    }
}
