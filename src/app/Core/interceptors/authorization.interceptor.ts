import {HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { combineLatest, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {

    let authService = inject(AuthService);

    return combineLatest([
        authService.isLoggedIn(),
        authService.getToken(),
      ]).pipe(
        switchMap(([isLogged, token]) => {
          if (isLogged) {
            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
                'X-APP-Identifier': 'soges-cliente'
              },
            });
            return next(newRequest);
          }
          return next(req);
        })
      );

};
