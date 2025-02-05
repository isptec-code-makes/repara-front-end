import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PessoaFilter} from "../types/pessoa";
import {Observable} from "rxjs";
import {Manager} from "../types/manager";

@Injectable({
    providedIn: 'root'
})
export class ManagerService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'managers');
    }

    public override create<Manager>(item: Manager, photo?: File): Observable<Manager> {

        let formDa: FormData = this.buildFormData(item, photo);
        console.log(photo);
        return this.http
            .post<Manager>(`${this.apiUrl}${this.controller}/`, formDa)
            .pipe((map) => {
                return map;
            });
    }

    public override update<ManagerUpdate>(item: ManagerUpdate, id: number, photo?: File): Observable<ManagerUpdate> {

        let formDa: FormData = this.buildFormData(item, photo)
        return this.http
            .patch<ManagerUpdate>(`${this.apiUrl}${this.controller}/${id}`, formDa)
            .pipe((map) => {
                return map;
            });
    }

    private buildFormData(item: Manager, photo?: File): FormData {
        let formData = new FormData();

        if (item.userName != null)
            formData.append("userName", item.userName.toString());

        if (item.email != null)
            formData.append("email", item.email.toString());

        if (photo != null)
            formData.append("photo", photo, photo.name);

        if (item.roles != null) {
            item.roles.forEach(role => {
                formData.append("roles", role);
            });
        }

        console.log(formData.getAll("roles"));

        return formData;
    }

    protected override attachHttpParams(params?: PessoaFilter | undefined): HttpParams {
        let httpParams = params ? this.attachBaseHttpParams(params) : new HttpParams();

        /*
            if (filter?.id != null)
                params = params.append('id', filter.id);

            if (filter?.name != null)
                params = params.append('name', filter.name);

            if (filter?.value != null)
                params = params.append('value', filter.value);

            if (filter?.clientId != null)
                params = params.append('clientId', filter.clientId);
        */

        return httpParams;
    }
}
