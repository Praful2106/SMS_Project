import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticService } from '../services/authentic.service';
import { Router } from '@angular/router';

export const guardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticService);
  const router = inject(Router)
  const isAutherize = !!authService.getToken()
  if (isAutherize) {
    return true
  }
  else {
    router.navigate(['/auth/sign-in'])
    return false
  }
};
