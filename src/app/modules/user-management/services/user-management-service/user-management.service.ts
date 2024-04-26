import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user.model';
import { environment } from '../../../../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private userEndpoints = environment.endpoints.users;

  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.userEndpoints.findAll}`);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.userEndpoints.findById}/${id}`);
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
}
