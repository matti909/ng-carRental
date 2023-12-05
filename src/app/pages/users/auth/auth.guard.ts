import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router) as Router;

  return authService.authState.pipe(
    filter(currentUser => currentUser !== undefined),
    map(currentUser => {
      if (currentUser.isLoggedIn) {
        return true;
      } else {
        router.navigateByUrl('/');
        return false;
      }
    })
  );
};
