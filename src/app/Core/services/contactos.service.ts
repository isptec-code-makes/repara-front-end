import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ContactoFilter} from "../types/contacto";

@Injectable({
    providedIn: 'root'
})
export class ContactosService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'contactos');
    }

    protected override attachHttpParams(filter?: ContactoFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter?.pessoaId != null)
            params = params.append('pessoaId', filter.pessoaId);

        if (filter?.contactoGrupoId != null)
            params = params.append('contactoGrupoId', filter.contactoGrupoId);

        if (filter?.contacto != null)
            params = params.append('contacto', filter.contacto);

        if (filter?.contactoTipo != null)
            params = params.append('contactoTipo', filter.contactoTipo);

        if (filter?.search != null)
            params = params.append('search', filter.search);


        return params;
    }
}
