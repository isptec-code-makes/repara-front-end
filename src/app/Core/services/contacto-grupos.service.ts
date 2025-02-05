import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactoGrupoFilter} from "../types/contactoGrupo";

@Injectable({
    providedIn: 'root'
})
export class ContactoGruposService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'contacto-grupos');
    }

    public addContactosToGroup(ids: number[], contactoGrupoId: number): Observable<number[]> {
        return this.http
            .post<number[]>(`${this.apiUrl}${this.controller}/${contactoGrupoId}/adicionar-contactos`, {
                contactoIdList: ids
            })
            .pipe((map) => {
                return map;
            });
    }

    public removeContactosGroup(ids: number[], contactoGrupoId: number): Observable<number[]> {
        return this.http
            .delete<number[]>(`${this.apiUrl}${this.controller}/${contactoGrupoId}/remover-contactos`, {
                body: {
                    contactoIdList: ids
                }
            })
            .pipe((map) => {
                return map;
            });
    }


    protected override attachHttpParams(filter?: ContactoGrupoFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter?.nome != null)
            params = params.append('nome', filter.nome);

        if (filter?.activo != null)
            params = params.append('activo', filter.activo);

        if (filter?.contactoTipo != null)
            params = params.append('contactoTipo', filter.contactoTipo);

        return params;
    }
}
