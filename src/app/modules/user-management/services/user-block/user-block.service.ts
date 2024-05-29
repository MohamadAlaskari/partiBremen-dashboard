// src/app/modules/user-management/services/user-block/user-block.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/Services/api.service';
import { User } from '../../../../core/models/partiBremen.model';
import { environment } from '../../../../../environment';


@Injectable({
  providedIn: 'root'
})
export class UserBlockService {
  private userEndpoints = environment.endpoints.users;

  constructor(private apiService: ApiService) {}

  blockUser(userId: string, blockUntilDatum?: Date): Observable<User> {
    console.log("apilast",blockUntilDatum);
      
    return this.apiService.post<User>(
      `${this.userEndpoints.block}/${userId}`,
      { blockUntilDatum: blockUntilDatum }
    );
  }

  unblockUser(userId: string): Observable<User> {


    return this.apiService.post<User>(
      `${this.userEndpoints.unblock}/${userId}`
    );
  }
}
