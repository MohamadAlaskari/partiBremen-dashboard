import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private userUrl = 'user';

  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`${this.userUrl}`);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.userUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.apiService.post<User>(this.userUrl, user);
  }
}
