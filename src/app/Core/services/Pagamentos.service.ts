import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PessoaFilter} from "../types/pessoa";
import {Pagamento} from '../types/pagamento';

@Injectable({
    providedIn: 'root'
})
export class PagamentosService extends BaseService {

    constructor(protected override http: HttpClient) {
        super(http, 'pagamentos');
    }


    updatePagamento(pagamento: Pagamento, comprovativoFile?: File) {
        let formData = new FormData();

        if (comprovativoFile != null)
            formData.append("comprovativo", comprovativoFile, comprovativoFile.name);

        if (pagamento.comentario != null)
            formData.append("comentario", pagamento.comentario);

        if (pagamento.dataPagamento != null)
            formData.append("dataPagamento", pagamento.dataPagamento.toString());

        if (pagamento.estado != null)
            formData.append("estado", pagamento.estado.toString());

        if (pagamento.metodo != null)
            formData.append("metodo", pagamento.metodo.toString());

        return this.http
            .patch<Pagamento>(
                `${this.apiUrl}${this.controller}/${pagamento.id}`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    createPagamento(pagamento: Pagamento, lancamentos: Array<number>, comprovativoFile?: File) {
        let formData = new FormData();

        if (comprovativoFile != null)
            formData.append("comprovativo", comprovativoFile, comprovativoFile.name);

        if (pagamento.comentario != null)
            formData.append("comentario", pagamento.comentario);

        if (pagamento.metodo != null)
            formData.append("metodo", pagamento.metodo.toString());

        if (pagamento.dataPagamento != null)
            formData.append("dataPagamento", pagamento.dataPagamento.toString());

        lancamentos.forEach(value => {
            formData.append("cobrancas", value.toString());
        });

        return this.http
            .post<Pagamento>(
                `${this.apiUrl}${this.controller}/`,
                formData
            )
            .pipe((map) => {
                return map;
            });
    }

    protected override attachHttpParams(filter?: PessoaFilter | undefined): HttpParams {
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
