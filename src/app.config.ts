import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { appInitializer } from './app/Core/app-initializer';
import { authorizationInterceptor } from './app/Core/interceptors/authorization.interceptor';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from './environments/environment';
import { ConfigService } from './app/Core/services/config.service';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './app/Core/store/reducers';

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(
        appRoutes, 
        withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), 
        withEnabledBlockingInitialNavigation()
      ),
      provideHttpClient(
        withFetch(), 
        withInterceptors([authorizationInterceptor])
      ),
      appInitializer,
      provideStore(reducers, {
        metaReducers
      }),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider(
                    environment.socialLogin.google.clientId
                  ),
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider(
                    environment.socialLogin.facebook.clientId
                  ),
                },
              ],
              onError: err => {
                console.error(err);
              },
            } as SocialAuthServiceConfig,
          },
          ConfigService
    ]
};
