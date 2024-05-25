import { Component } from '@angular/core';
import { ReportManagementService } from '../../services/report-management.service';
import { Report } from '../../../../core/models/partiBremen.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrl: './report-management.component.scss',
})
export class ReportManagementComponent {
  title: string = 'Report Managemant';
  id: string | null = null;
  report!: Report;
  reports: Report[] = [];
  private subscriptions: Subscription = new Subscription();
  constructor(
    private reportService: ReportManagementService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.extractIdFromRoute();
  }

  private extractIdFromRoute(): void {
    this.activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadReport(this.id);
      }
    });
  }

  private loadReports() {}
  private loadReport(reportId: string): void {
    this.subscriptions.add(
      this.reportService.getReportByReportId(reportId).subscribe({
        next: (report: Report) => {
          this.report = report;
        },
        error: (error) => {
          console.log('An error occurred while fetching report data', error);
        },
        complete: () => {
          if (this.report.reportedUserId) {
            this.loadReportsByReportedUserId(this.report.reportedUserId);
          } else if (this.report.reportedCommentId) {
            this.loadReportsByReportedCommentsId(this.report.reportedCommentId);
          } else if (this.report.reportedPoiId) {
            this.loadReportsByReportedPoiId(this.report.reportedPoiId);
          }
        },
      })
    );
  }

  private loadReportsByReportedUserId(reportedUserId: string) {
    this.subscriptions.add(
      this.reportService.getReportsByUserId(reportedUserId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports;
        },
        error: (error) => {
          console.log(
            'an error occure while fetching Reports by User Data ',
            error
          );
        },
      })
    );
  }
  private loadReportsByReportedPoiId(reportedPoiId: string) {
    this.subscriptions.add(
      this.reportService.getReportsByPoiId(reportedPoiId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports;
        },
        error: (error) => {
          console.log(
            'an error occure while fetching Reports by POI Data ',
            error
          );
        },
      })
    );
  }
  private loadReportsByReportedCommentsId(reportedCommentsId: string) {
    this.subscriptions.add(
      this.reportService.getReportsByCommentId(reportedCommentsId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports;
        },
        error: (error) => {
          console.log(
            'an error occure while fetching Reports by Comment  Data ',
            error
          );
        },
      })
    );
  }

  ngOnDestroy() {
    // Abmelden von allen Abonnements
    this.subscriptions.unsubscribe;
  }
}
