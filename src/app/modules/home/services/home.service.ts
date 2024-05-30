import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { ApiService } from '../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { Poi } from '../../../core/models/partiBremen.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private poiEndepoints = environment.endpoints.pois;

  constructor(private apiService: ApiService) {}

  getPOIs(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(this.poiEndepoints.findAll);
  }
}
