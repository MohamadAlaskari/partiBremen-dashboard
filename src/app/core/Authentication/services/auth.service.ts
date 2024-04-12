import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../../../shared/models/user.model';
import {environment} from "../../../../environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient) {}
  login(user: User): Observable<any> {
    return this.http.post(this.authUrl, user).pipe(
      map((response: any) => {
        // Speichere den Token, wenn der Login erfolgreich war
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return response;
        }
      }),
      catchError((error) => {
        // Implementiere eine Fehlerbehandlung
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
