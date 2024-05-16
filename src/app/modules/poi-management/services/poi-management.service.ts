import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../../../core/Services/api.service';
import { Poi } from '../../../shared/models/poi.model';
import { User } from '../../../shared/models/user.model';
import { environment } from '../../../../environment';
import { Updatepoi } from "../../../shared/models/updatepoi.model";
import { MatTableDataSource } from "@angular/material/table";
import { CounterState } from "../../../shared/components/state-counter/state-counter.component";

@Injectable({
  providedIn: 'root',
})
export class PoiManagementService {
  private poiEndpoints = environment.endpoints.pois;
  private currentPoiSubject = new BehaviorSubject<any>(null);
  public currentPoi$ = this.currentPoiSubject.asObservable();
  public currentPoi: any = null;
  pois: Poi[] = [];
  private subscriptions: Subscription = new Subscription();
  dataSource = new MatTableDataSource<Poi>();
  counters: CounterState[] = [];

  constructor(private apiService: ApiService) {}

  updateCounters(): void {
    const allpois = this.dataSource.filteredData.filter(
      (poi) => poi.active
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

  loadPoiById(poiId: string): void {
    this.subscriptions.add(
      this.getPoiByID(poiId).subscribe({
        next: (poi) => {
          this.currentPoi = poi;
          this.currentPoiSubject.next(poi);
        },
        error: (err) => console.error('Error loading POI:', err),
      })
    );
  }

  loadPois(): void {
    this.subscriptions.add(
      this.getPois().subscribe({
        next: (pois) => {
          this.pois = pois;
          this.dataSource.data = pois;
          this.updateCounters();
        },
        error: (err) => console.error('Error loading POIs:', err),
      })
    );
  }

  // API methods
  getPois(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findOnly}`);
  }

  getPoiByID(id: string): Observable<Poi> {
    return this.apiService.get<Poi>(`${this.poiEndpoints.findById}/${id}`);
  }

  updatePoi(poiId: string, poi: Updatepoi): Observable<Updatepoi> {
    const url = `${this.poiEndpoints.update}/${poiId}`;
    console.log(`Updating POI at URL: ${url}`);
    return this.apiService.put<Updatepoi>(url, poi);
  }

  deletePoi(poiId: string): Observable<Poi> {
    return this.apiService.delete<any>(
      `${this.poiEndpoints.delete}/${poiId}`
    );
  }
}
