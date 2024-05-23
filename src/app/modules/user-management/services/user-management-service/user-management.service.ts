import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';
import { User, Poi } from '../../../../core/models/partiBremen.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private userEndpoints = environment.endpoints.users;
  private poiEndpoints = environment.endpoints.pois;

  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.userEndpoints.findAll}`);
  }

  getUserById(userId: string): Observable<User> {
    return this.apiService.get<User>(
      `${this.userEndpoints.findById}/${userId}`
    );
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post<User>(this.userEndpoints.create, user);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.apiService.put<User>(
      `${this.userEndpoints.update}/${userId}`,
      user
    );
  }

  deleteUser(userId: string): Observable<User> {
    return this.apiService.delete<any>(
      `${this.userEndpoints.delete}/${userId}`
    );
  }

  getPois(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findAll}`);
  }
  getPoisByUserId(userId: string): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(
      `${this.poiEndpoints.findByUserId}/${userId}`
    );
  }
}
