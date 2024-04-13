import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environment';
import { ApiService } from '../../Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'login'; // Use an appropriate API endpoint

  constructor(private apiService: ApiService) {}

  login(user: User): Observable<any> {
    return this.apiService.post(this.authUrl, user).pipe(
      map((response: any) => {
        // Store the token when login is successful
        if (response && response.token) {
          this.setToken(response.token);
          return response;
        }
      }),
      catchError((error) => throwError(error))
    );
  }

  logout(): void {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
