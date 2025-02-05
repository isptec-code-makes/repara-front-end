import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {QuestionarioRespostaChart, QuestionarioRespostaFilter} from "../types/questionarioResposta";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class QuestionarioRespostasService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'questionario-respostas');
    }

    public getChart(questionarioId: number): Observable<QuestionarioRespostaChart> {
        return this.http.get<QuestionarioRespostaChart>(
            `${this.apiUrl}${this.controller}/chart/${questionarioId}`
        );
    }

    protected override attachHttpParams(filter?: QuestionarioRespostaFilter | undefined): HttpParams {
        let params = filter ? this.attachBaseHttpParams(filter) : new HttpParams();

        if (filter?.pessoaId != null)
            params = params.append('pessoaId', filter.pessoaId);

        if (filter?.questionarioId != null)
            params = params.append('questionarioId', filter.questionarioId);

        return params;
    }
}
