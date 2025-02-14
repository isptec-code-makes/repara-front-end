import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { distinctUntilChanged, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseFilter } from '../types/filters/base-filter';
import { catchError, map } from 'rxjs/operators';
import { GetAllResponde } from '../types/getAllResponde';
import { Router } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<TClass, TFilter extends BaseFilter> {
    protected abstract attachHttpParams(filter?: TFilter): HttpParams;

    private httpRequestRetry: number;
    private readonly router = inject(Router);
    private readonly configService = inject(ConfigService);

    // modificar o constructor para receber apenas o controller
    protected constructor(
        protected http: HttpClient,
        protected controller: string
    ) {
        this.httpRequestRetry = environment.httpRequestRetry;
    }

    protected get apiUrl(): string {
        return this.configService.getConfig.apiUrl;
    }

    public create(item: TClass): Observable<TClass> {
        return this.http.post<TClass>(`${this.apiUrl}${this.controller}/`, item).pipe((map) => {
            return map;
        });
    }

    public getAll(filter: TFilter): Observable<GetAllResponde<TClass>> {
        let params: HttpParams;

        params = this.attachHttpParams(filter);

        return this.http
            .get<TClass[]>(`${this.apiUrl}${this.controller}/`, {
                params: params,
                observe: 'response'
            })
            .pipe(
                map((response) => {
                    const pagination = response.headers.get('X-Pagination');
                    let totalCount = 0;
                    let pageSize = 0;
                    let currentPage = 0;
                    if (pagination) {
                        const paginationData = JSON.parse(pagination);
                        totalCount = Number(paginationData.TotalCount);
                        pageSize = Number(paginationData.PageSize);
                        currentPage = Number(paginationData.CurrentPage);
                    }
                    return {
                        data: response.body ?? [],
                        totalCount: totalCount,
                        pageSize: pageSize,
                        currentPage: currentPage
                    };
                }),
                distinctUntilChanged(),
                retry(this.httpRequestRetry),
                catchError(this.handleError.bind(this))
            );
    }

    public getById(id: number | string): Observable<TClass | null> {
        return this.http.get<TClass>(`${this.apiUrl}${this.controller}/${id}`);
    }

    public update(item: TClass, id: number): Observable<TClass> {
        return this.http.put<TClass>(`${this.apiUrl}${this.controller}/${id}`, item).pipe((map) => {
            return map;
        });
    }

    public delete<TClass>(id: number | string): Observable<TClass> {
        return this.http.delete<TClass>(`${this.apiUrl}${this.controller}/` + id).pipe((map) => {
            return map;
        });
    }

    protected attachBaseHttpParams(filter: TFilter): HttpParams {
        let params: HttpParams = new HttpParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value != null) {
                params = params.append(key, value.toString());
            }
        });

        return params;
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Client-side or network error
            return throwError(() => ({
                message: 'Erro na rede ou no seu dispositivo',
                details: error.error.message,
                type: 'CLIENT_ERROR'
            }));
        }

        // Server-side errors
        const errorResponse = {
            status: error.status,
            message: '',
            type: 'SERVER_ERROR',
            details: error.error?.message || error.message
        };

        switch (error.status) {
            case 400:
                errorResponse.message = 'Requisição inválida';
                errorResponse.type = 'VALIDATION_ERROR';
                break;
            case 401:
                errorResponse.message = 'Não autorizado';
                this.router.navigate(['/login']);
                break;
            case 403:
                errorResponse.message = 'Acesso negado';
                this.router.navigate(['/unauthorized']);
                break;
            case 404:
                errorResponse.message = 'Não encontrado';
                errorResponse.type = 'NOT_FOUND';
                break;
            case 408:
                errorResponse.message = 'Tempo limite da requisição esgotado';
                errorResponse.type = 'TIMEOUT_ERROR';
                break;
            case 500:
                errorResponse.message = 'Erro interno do servidor';
                errorResponse.type = 'SERVER_ERROR';
                break;
            case 503:
                errorResponse.message = 'Serviço indisponível';
                errorResponse.type = 'SERVICE_UNAVAILABLE';
                break;
            default:
                errorResponse.message = 'Erro desconhecido';
                errorResponse.type = 'UNKNOWN_ERROR';
        }

        console.error('API Error:', errorResponse);
        return throwError(() => errorResponse);
    }
}
