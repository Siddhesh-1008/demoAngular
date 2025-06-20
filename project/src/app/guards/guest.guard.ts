import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    map(user => {
      const roles = user?.['https://dev-gthndu70rgp1cku6.us.auth0.com/api/v2/roles'] || [];
      if (!roles.includes('guest')) {
        router.navigate(['/welcome']);
        return false;
      }
      return true;
    })
  );
};