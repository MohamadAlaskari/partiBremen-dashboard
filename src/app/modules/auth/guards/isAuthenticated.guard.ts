import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Import AuthService
@Injectable({
    providedIn: 'root'
  })
  export class isAuthenticatedGuard  implements CanActivate {
  
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(): boolean {
      if (!this.authService.isAuthenticated()) {

        return true; // Allow access if not logged in
      } else {
        this.router.navigate(['dashboard']); // Redirect to dashboard if logged in
        return false;
      }
    }
  }