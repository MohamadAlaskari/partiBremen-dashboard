import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://your-backend-api/login'; // Der URL-Pfad zu deinem Authentifizierungs-Endpoint

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
    // Entferne den Token aus dem Local Storage, um den Logout durchzuführen
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return false;
    // Hier prüfen, ob der Benutzer angemeldet ist, z.B. überprüfen, ob ein Token vorhanden ist
    //return !!localStorage.getItem('token');
  }
}
