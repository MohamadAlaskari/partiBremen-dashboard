import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/Services/api.service';
import { User } from '../../../shared/models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userEndpoints = environment.endpoints.users;

  constructor(private apiService: ApiService) {}

  login(email: string, password: string): Observable<User> {
    const body = { email: email, password: password };
    return this.apiService.post<User>(this.userEndpoints.login, body).pipe(
      map((response) => {
        if (response) {
          this.storeUser(response);
          localStorage.setItem('status', 'logedin');
          return response;
        }
        throw new Error('No user data received');
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error(`Login failed: ${error.message}`));
      })
    );
  }
  logout(userId: string): Observable<void> {
    const endpoint = `${this.userEndpoints.logout}/${userId}`;
    return this.apiService.post<void>(endpoint).pipe(
      map(() => {
        this.clearUser();
        localStorage.setItem('status', 'loggedout');
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error(`Logout failed: ${error.message}`));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): User | null {
    const userJson = this.getUserData();
    return userJson ? JSON.parse(userJson) : null;
  }

  private storeUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private getUserData(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user');
    }
    return null;
  }

  private clearUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
}
