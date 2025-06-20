import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        auth.login(); // Redirect to login if not authenticated
      }
    }),
    map(isAuthenticated => isAuthenticated)
  );
};

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'];

  return auth.hasRole(requiredRole).pipe(
    tap(hasRole => {
      if (!hasRole) {
        router.navigate(['/dashboard']);
      }
    })
  );
};