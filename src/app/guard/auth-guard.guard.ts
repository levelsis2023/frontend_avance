import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServiceService = inject(AuthService);
  if (authServiceService.isLoggedIn()) {
    return true
  } else {
    router.navigate(['/login']);
    return false;
  }
};
