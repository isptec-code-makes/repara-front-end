import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ContactoFilter} from "../types/contacto";
import { Cliente, ClienteFilter } from "../types/cliente";

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente, ClienteFilter> {   

    constructor(protected override http: HttpClient) {
        super(http, 'contactos');
    }

    protected override attachHttpParams(filter: ContactoFilter): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
            params = params.append(key, value.toString());
            }
        });
        
        return params;
    }
}
