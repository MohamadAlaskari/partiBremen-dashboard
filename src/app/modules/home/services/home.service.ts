import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { ApiService } from '../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { Poi, Report } from '../../../core/models/partiBremen.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private poiEndepoints = environment.endpoints.pois;
  private reportEndepoints = environment.endpoints.report;

  constructor(private apiService: ApiService) {}

  getPOIs(): Observable<Poi[]> {
    return this.apiService.get<Poi[]>(this.poiEndepoints.findAll);
  }

  createPoi(titel: string, description: string, creatorId: string, latitude: number, longitude: number): Observable<Poi> {
    const url = `${this.poiEndepoints.create}`;
    const body = {
      "titel": titel,
      "description": description,
      "active": true,
      "creatorId": creatorId,
      "latitude": latitude,
      "longitude": longitude,
      "img": "string"
    };
    return this.apiService.post<Poi>(url, body);
  }

  createpoireport(title: string, kommentar: string, creatorId: string, poiId: string): Observable<Report> {
    const currentTimestamp = new Date().toISOString();
    const url = `${this.reportEndepoints.create}`;
    const body = {
      "titel": title,
      "kommentar": kommentar,
      "reporterId": creatorId,
      "reportedPoiId": poiId,
      "createdAt": currentTimestamp,
      "updatedAt": currentTimestamp
    };
    return this.apiService.post<Report>(url, body);
  }

  createuserreport(title: string, kommentar: string, creatorId: string, userId: string): Observable<Report> {
    const currentTimestamp = new Date().toISOString();
    const url = `${this.reportEndepoints.create}`;
    const body = {
      "titel": title,
      "kommentar": kommentar,
      "reporterId": creatorId,
      "reportedUserId": userId,
      "createdAt": currentTimestamp,
      "updatedAt": currentTimestamp
    };
    return this.apiService.post<Report>(url, body);
  }

  createcommentreport(title: string, kommentar: string, creatorId: string, commentId: string): Observable<Report> {
    const currentTimestamp = new Date().toISOString();
    const url = `${this.reportEndepoints.create}`;
    const body = {
      "titel": title,
      "kommentar": kommentar,
      "reporterId": creatorId,
      "reportedCommentId": commentId,
      "createdAt": currentTimestamp,
      "updatedAt": currentTimestamp
    };
    return this.apiService.post<Report>(url, body);
  }
}
