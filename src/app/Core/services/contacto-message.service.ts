import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IMensagemFilter, SendMessageToContact, SendMessageToGrupo} from "../types/mensagem";

@Injectable({
    providedIn: 'root'
})
export class ContactoMessageService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'mensagem');
    }

    public sendMesssageToContact(item: SendMessageToContact): Observable<any> {
        console.log(item);
        return this.http
            .post(`${this.apiUrl}${this.controller}/send-to-contacto`, item)
            .pipe((map) => {
                return map;
            });
    }

    public sendMesssageToGroup(item: SendMessageToGrupo): Observable<Array<number>> {
        return this.http
            .post<Array<number>>(`${this.apiUrl}${this.controller}/send-to-grupo`, item)
            .pipe((map) => {
                return map;
            });
    }

    protected override attachHttpParams(filter?: IMensagemFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();


        if (filter?.estado != null)
            params = params.append('estado', filter.estado);


        return params;
    }
}
