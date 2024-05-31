import { Injectable } from '@angular/core';
import { ApiService } from '../../core/Services/api.service';
import { Report } from '../../core/models/partiBremen.model';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportNotificationsService {
  reports: Report[] = [];
  private reportEndpoints = environment.endpoints.report;
  constructor(private apiService: ApiService) {}

  getReports(): Observable<Report[]> {
    return this.apiService.get<Report[]>(`${this.reportEndpoints.findAll}`);
  }

  getUserById(reportId: string): Observable<Report> {
    return this.apiService.get<Report>(
      `${this.reportEndpoints.findById}/${reportId}`
    );
  }

  createUser(report: Report): Observable<Report> {
    return this.apiService.post<Report>(this.reportEndpoints.create, report);
  }

  updateUser(reportId: string, report: Report): Observable<Report> {
    return this.apiService.put<Report>(
      `${this.reportEndpoints.update}/${reportId}`,
      report
    );
  }

  deleteUser(reportId: string): Observable<Report> {
    return this.apiService.delete<any>(
      `${this.reportEndpoints.delete}/${reportId}`
    );
  }
}
