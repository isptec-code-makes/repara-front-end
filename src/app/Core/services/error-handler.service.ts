import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req.clone()
        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    let errorMessage = this.handleError(err);
                    return throwError(() => new Error(errorMessage));

                })
            )
    }

    private handleError = (error: HttpErrorResponse): string => {
        if (error.status === 404) {
            return this.handleNotFound(error);
        } else if (error.status === 400) {
            return this.handleBadRequest(error);
        }
    }
    private handleNotFound = (error: HttpErrorResponse): string => {
        this.router.navigate(['/not-found']);
        return error.message;
    }
    private handleBadRequest = (error: HttpErrorResponse): string => {
        if (this.router.url === '/auth/login') {
            let message = '';
            const values = Object.values(error.error.errors);
            values.map((m: string) => {
                message += m + '<br>';
            })
            return message.slice(0, -4);
        } else {
            return error.error ? error.error : error.message;
        }
    }
}
