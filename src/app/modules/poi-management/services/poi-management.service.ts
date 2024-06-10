import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ApiService } from '../../../core/Services/api.service';
import { environment } from '../../../../environment';
import { MatTableDataSource } from "@angular/material/table";
import { CounterState } from "../../../shared/components/state-counter/state-counter.component";
import {Poi, Report} from "../../../core/models/partiBremen.model";

@Injectable({
  providedIn: 'root',
})
export class PoiManagementService {
  private poiEndpoints = environment.endpoints.pois;
  pois: Poi[] = [];
  dataSource = new MatTableDataSource<Poi>();
  counters: CounterState[] = [
    { count: 3, label: 'Aktiv' },
    { count: 3, label: 'inaktiv' },
    { count: 3, label: 'Insgesamt' },
  ];

  constructor(private apiService: ApiService) {}

  updateCounters(): void {
    const allpois = this.dataSource.filteredData.filter(
      (poi) => poi.active || poi.active === false
    );
    const activepois = this.dataSource.filteredData.filter(
      (poi) => poi.active
    );
    const inactivepois = this.dataSource.filteredData.filter(
      (poi) => poi.active === false
    );

    this.counters = [
      { count: activepois.length, label: 'Aktiv' },
      { count: inactivepois.length, label: 'inaktiv' },
      { count: allpois.length, label: 'Insgesamt' },
    ];
  }

  // API methods
  getPois(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findOnly}`);
  }
  getallpoi(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findAll}`);
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

  deletePoi(poiId: string): Observable<Poi> {
    console.log(poiId)
    return this.apiService.delete<any>(
      `${this.poiEndpoints.delete}/${poiId}`
    );
  }


  getComments(id: string) {

  }
}
