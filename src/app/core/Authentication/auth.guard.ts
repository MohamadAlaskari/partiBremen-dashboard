import { Inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = Inject(AuthService);
  if(!authService.isLoggedIn()) {
    return false;

  }else{

    return true;
  }
};
