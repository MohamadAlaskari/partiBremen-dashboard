import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/Services/api.service';
import { User } from '../../../shared/models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginEndpoint = environment.endpoints.users.login;

  constructor(private apiService: ApiService) {}

  login(email: string, password: string): Observable<User> {
    const body = { email: email, password: password };
    return this.apiService.post<User>(this.loginEndpoint, body).pipe(
      map((response) => {
        if (response) {
          this.storeUser(response);
          localStorage.setItem('status', "logedin");
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
  logout(): void {
    this.clearUser();
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
