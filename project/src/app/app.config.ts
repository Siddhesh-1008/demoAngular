import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: 'dev-gthndu70rgp1cku6.us.auth0.com',
        clientId: 'isCA2SmduqKlqQkYNmMOwrN74yw5Iaui',
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: 'https://dev-gthndu70rgp1cku6.us.auth0.com/api/v2/',
          scope: 'openid profile email roles'
        },
        cacheLocation: 'localstorage'
      })
    )
  ]
};