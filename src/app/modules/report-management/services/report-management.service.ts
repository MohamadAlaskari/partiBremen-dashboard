import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { ApiService } from '../../../core/Services/api.service';
import { Observable } from 'rxjs';
import { Report } from '../../../core/models/partiBremen.model';

@Injectable({
  providedIn: 'root',
})
export class ReportManagementService {
  reportEndePoints = environment.endpoints.report;

  constructor(private apiService: ApiService) {}

  getReports(): Observable<Report[]> {
    return this.apiService.get<Report[]>(`${this.reportEndePoints.findAll}`);
  }
  getReportByReportId(reportId: string): Observable<Report> {
    return this.apiService.get<Report>(
      `${this.reportEndePoints.findById}/${reportId}`
    );
  }

  getReportsByPoiId(poiId: string): Observable<Report[]> {
    return this.apiService.get<Report[]>(
      `${this.reportEndePoints.findRebortsByRebortedPoiId}/${poiId}`
    );
  }

  getReportsByCommentId(commentId: string): Observable<Report[]> {
    return this.apiService.get<Report[]>(
      `${this.reportEndePoints.findRebortsByRebortedCommentId}/${commentId}`
    );
  }

  getReportsByUserId(userId: string): Observable<Report[]> {
    return this.apiService.get<Report[]>(
      `${this.reportEndePoints.findRebortsByRebortedUserId}/${userId}`
    );
  }

  updateReport(report: Report): Observable<Report> {
    return this.apiService.put<Report>(
      `${this.reportEndePoints.update}`,
      report
    );
  }
}
