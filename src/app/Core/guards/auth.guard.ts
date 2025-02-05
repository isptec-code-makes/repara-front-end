import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

import { combineLatest, map } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return combineLatest([
         authService.isLoggedIn(),
        authService.getRole(),
    ]).pipe(
        map(([isLogged, role]) => {
            if (isLogged) {
                if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
                    router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
                    return false;
                }
                return true;
            }
            router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
            return false;
        })
    );


};
