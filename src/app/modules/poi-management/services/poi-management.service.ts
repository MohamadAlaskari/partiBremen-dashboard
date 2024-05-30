import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiService } from '../../../core/Services/api.service';
import { environment } from '../../../../environment';
import { MatTableDataSource } from "@angular/material/table";
import { CounterState } from "../../../shared/components/state-counter/state-counter.component";
import {Poi, Survey, Report} from "../../../core/models/partiBremen.model";

@Injectable({
  providedIn: 'root',
})
export class PoiManagementService {
  private poiEndpoints = environment.endpoints.pois;
  private surveyEndpoints = environment.endpoints.surveys;
  private currentPoiSubject = new BehaviorSubject<any>(null);
  pois: Poi[] = [];
  private subscriptions: Subscription = new Subscription();
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

  async loadPoiById(poiId: string): Promise<Poi> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.getPoiByID(poiId).subscribe({
          next: (poi) => {
            this.currentPoiSubject.next(poi);
            resolve(poi); // Return the poi object
          },
          error: (err) => {
            console.error('Error loading POI:', err);
            reject(err); // Reject the promise in case of an error
          },
        })
      );
    });
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
  getallpoi(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(`${this.poiEndpoints.findAll}`);
  }

  getPoiByID(id: string): Observable<Poi> {
    return this.apiService.get<Poi>(`${this.poiEndpoints.findById}/${id}`);
  }

  updatePoi(poiId: string, poi: Poi): Observable<Poi> {
    const url = `${this.poiEndpoints.update}/${poiId}`;
    console.log(`Updating POI at URL: ${url}`);
    return this.apiService.put<Poi>(url, poi);
  }

  deletePoi(poiId: string): Observable<Poi> {
    return this.apiService.delete<any>(
      `${this.poiEndpoints.delete}/${poiId}`
    );
  }

  async getSurveys(id: string) : Promise<Survey[]>{
    try {
      const poi = await this.loadPoiById(id);
      console.log('Loaded POI:', poi); // Move this before the return statement
      return poi.surveys;
    } catch (error) {
      console.error('Failed to load POI:', error);
      return []; // Return an empty array in case of an error
    }
  }

  getSurveyById(id: string) {
    return this.apiService.get<Survey>(`${this.surveyEndpoints.findById}/${id}`);
  }

  getComments(id: string) {

  }

  async loadSurveyById(surveyId: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.getSurveyById(surveyId).subscribe({
          next: (survey) => {
            this.currentPoiSubject.next(survey);
            resolve(survey); // Return the poi object
          },
          error: (err) => {
            console.error('Error loading Survey:', err);
            reject(err); // Reject the promise in case of an error
          },
        })
      );
    });
  }

  updateSurvey(surveyId: string, survey: Survey) {
    const url = `${this.surveyEndpoints.update}/${surveyId}`;
    console.log(`Updating Survey at URL: ${url}`);
    return this.apiService.put<Poi>(url, survey);
  }

  deleteSurvey(surveyId: string): Observable<Survey> {
    return this.apiService.delete<any>(
      `${this.surveyEndpoints.delete}/${surveyId}`
    );
  }
}
