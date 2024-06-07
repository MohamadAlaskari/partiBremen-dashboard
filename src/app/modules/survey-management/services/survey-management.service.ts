import { Injectable } from '@angular/core';
import {Poi, Survey} from "../../../core/models/partiBremen.model";
import {Observable} from "rxjs";
import {ApiService} from "../../../core/Services/api.service";
import {environment} from "../../../../environment";
import {PoiManagementService} from "../../poi-management/services/poi-management.service";
import {MatTableDataSource} from "@angular/material/table";
import {CounterState} from "../../../shared/components/state-counter/state-counter.component";

@Injectable({
  providedIn: 'root'
})
export class SurveyManagementService {
  private surveyEndpoints = environment.endpoints.surveys;
  dataSource = new MatTableDataSource<Survey>();
  surveys: Survey[] = []
  counters: CounterState[] = [
    { count: 3, label: 'Aktiv' },
    { count: 3, label: 'inaktiv' },
    { count: 3, label: 'Insgesamt' },
  ];

  constructor(private apiService: ApiService,
              private poiManagementservice: PoiManagementService) { }

  getSurveyById(id: string) {
    return this.apiService.get<Survey>(`${this.surveyEndpoints.findById}/${id}`);
  }

  getSurveys(){
    return this.apiService.get<Survey[]>(`${this.surveyEndpoints.findAll}`)
  }

  updateCounters(): void {
      const currentDate = new Date();
      const activeSurveys = this.dataSource.filteredData.filter(
          (survey) => new Date(survey.expiresAt) > currentDate
      );

      const inactivesurveys = this.dataSource.filteredData.filter(
          (survey) => new Date(survey.expiresAt) <= currentDate
      );


    this.counters = [
      { count: activeSurveys.length, label: 'Aktiv' },
      { count: inactivesurveys.length, label: 'inaktiv' },
      { count: this.surveys.length, label: 'Insgesamt' },
    ];
  }

  deleteSurvey(surveyId: string): Observable<Survey> {
    return this.apiService.delete<any>(
      `${this.surveyEndpoints.delete}/${surveyId}`
    );
  }

  getPoiByID(poiId: string) {
    return this.poiManagementservice.getPoiByID(poiId)
  }
}
