import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../core/Services/api.service";
import {environment} from "../../../../enviroments/environment";
import {Poi} from "../../../shared/models/poi.model";

@Injectable({
  providedIn: 'root'
})
export class PoiManagementService {
  private poiEndpoints = environment.endpoints.pois;

  private currentpoi = {
    id: 1,
    name: 'Baum',
    date: '20.03.1996',
    status: 'In Planung',
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
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findAll}`);
  }
}
