import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Import AuthService
@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
      if (this.authService.isAuthenticated()) {
        return true; // Allow access
      } else {
        this.router.navigate(['/login']); // Redirect to login page
        return false;
      }
    }
  }
