import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../../shared/models/user.model';
import { ApiService } from '../../Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginEndpoint = 'user/login'; // Use an appropriate API endpoint

  constructor(private apiService: ApiService) {}
  login(email: string, password: string): Observable<User> {
    return this.apiService
      .post<User>(this.loginEndpoint, { email, password })
      .pipe(
        map((user) => {
          if (user) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
          }
          throw new Error('No user data received');
        }),
        catchError((error) =>
          throwError(() => new Error('Login failed: ' + error.message))
        )
      );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
   // return true;
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  getCurrentUser(): User | null {
    if (typeof localStorage !== 'undefined') {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    }
    return null;
  }
}
