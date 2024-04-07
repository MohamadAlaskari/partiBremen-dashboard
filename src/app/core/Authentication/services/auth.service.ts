import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return true;
     // Hier prüfen, ob der Benutzer angemeldet ist, z.B. überprüfen, ob ein Token vorhanden ist
     //return !!localStorage.getItem('token');
  }
}
