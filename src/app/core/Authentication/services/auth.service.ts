import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../../../shared/models/user.model';
import { ApiService } from '../../Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'login'; // Use an appropriate API endpoint

  constructor(private apiService: ApiService) {}

  login(email: string, password: string): Observable<User> {
    return this.apiService.login<User>(email, password)
      .pipe(
        map(user => {
          if (user) {
            this.storeUser(user);
            return user;
          }
          throw new Error('No user data received');
        }),
        catchError(error => throwError(() => new Error('Login failed: ' + error.message)))
      );
  }

  logout(): void {
    this.removeUser();
  }

  isAuthenticated(): boolean {
    return true
    return this.getUser() != null; // Überprüft, ob Benutzerdaten gespeichert sind
  }
  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return null;
  }
  private storeUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user)); // Speichere den Benutzer als String
    }
  }

  private getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? (JSON.parse(userStr) as User) : null;
    }
    return null;
  }

  private removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }
}
