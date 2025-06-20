import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { map, Observable, tap } from 'rxjs';
import { AUTH_CONFIG } from '../constants/auth.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth0: Auth0Service,
    private router: Router
  ) {
    // Handle authentication state changes
    this.auth0.isAuthenticated$.subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/welcome']);
      }
    });
  }

  isAuthenticated$: Observable<boolean> = this.auth0.isAuthenticated$;
  user$ = this.auth0.user$;

  login(): void {
    this.auth0.loginWithRedirect({
      appState: { target: '/dashboard' }
    });
  }

  logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: window.location.origin + '/#/welcome'
      }
    });
  }

  hasRole(role: string): Observable<boolean> {
    return this.auth0.user$.pipe(
      map(user => {
        const roles = 
          user?.[`${AUTH_CONFIG.NAMESPACE}/roles`] ||
          user?.[`${AUTH_CONFIG.NAMESPACE}/${AUTH_CONFIG.ROLES_KEY}`] ||
          user?.[`${AUTH_CONFIG.NAMESPACE}/${AUTH_CONFIG.CLAIMS_KEY}`] ||
          [];
        return Array.isArray(roles) ? roles.includes(role) : false;
      })
    );
  }

  getRoles(): Observable<string[]> {
    return this.auth0.user$.pipe(
      map(user => {
        const roles = 
          user?.[`${AUTH_CONFIG.NAMESPACE}/roles`] ||
          user?.[`${AUTH_CONFIG.NAMESPACE}/${AUTH_CONFIG.ROLES_KEY}`] ||
          user?.[`${AUTH_CONFIG.NAMESPACE}/${AUTH_CONFIG.CLAIMS_KEY}`] ||
          [];
        return Array.isArray(roles) ? roles : [];
      })
    );
  }
}