import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Check if route requires admin
    if (route.data?.['role'] && route.data['role'] !== authService.user()?.role) {
         router.navigate(['/']); // Redirect to home if not authorized
         return false;
    }
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
