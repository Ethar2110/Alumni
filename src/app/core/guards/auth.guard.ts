import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Check if route requires admin
    if (route.data?.['role'] === 'admin' && !authService.isAdmin()) {
         router.navigate(['/']);
         return false;
    }
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
