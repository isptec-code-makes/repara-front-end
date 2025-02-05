import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {QuestionariFilter} from "../types/questionario";

@Injectable({
    providedIn: 'root'
})
export class QuestionarioService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'questionarios');
    }

    protected override attachHttpParams(filter?: QuestionariFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

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

        return params;
    }
}
