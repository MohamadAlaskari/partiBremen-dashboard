import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  /**
   * Führt eine GET-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt, inklusive eventueller Parameter
   * @returns Ein Observable mit dem Antworttyp
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  /**
   * Führt eine POST-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @param body Das zu sendende Datenobjekt, beinhaltet die notwendigen Informationen
   * @param reqOpts Optionale Anforderungsoptionen, die spezifische Header enthalten können
   * @returns Ein Observable mit dem Antworttyp
   */
  post<T>(endpoint: string, body: any, reqOpts?: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * Führt eine PUT-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @param body Das zu aktualisierende Datenobjekt
   * @returns Ein Observable mit dem Antworttyp
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
  }

  /**
   * Führt eine DELETE-Anfrage auf den angegebenen Endpunkt aus.
   * @param endpoint Der relative Pfad zum Ressourcen-Endpunkt
   * @returns Ein Observable mit dem Antworttyp
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }
}
