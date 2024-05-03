import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../core/Services/api.service";
import {environment} from "../../../../enviroments/environment";
import {Poi} from "../../../shared/models/poi.model";
import {User} from "../../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PoiManagementService {
  private poiEndpoints = environment.endpoints.pois;

  private currentpoi = {
    id: 1,
    name: 'Baum',
    date: '20.03.1996',
    status: true,
    beschreibung: 'cooler poi',
    adresse: 'Bremen'
  };

  constructor(private apiService: ApiService) {}

  getPoi() {
      return this.currentpoi;
  }

  setPoi(poi: any) {
      this.currentpoi = poi;
  }

  getPois(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findOnly}`);
  }

  getPoiByID(id: string): Observable<Poi> {
    return this.apiService.get<Poi>(`${this.poiEndpoints.findById}/${id}`);
  }

  updatePoi(poiId: string, poi: Poi): Observable<Poi> {
    return this.apiService.put<Poi>(
      `${this.poiEndpoints.update}/${poiId}`,
      poi
    );
  }
}
