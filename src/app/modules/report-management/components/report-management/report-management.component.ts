import { Component } from '@angular/core';
import { ReportManagementService } from '../../services/report-management.service';
import { Report, User } from '../../../../core/models/partiBremen.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrl: './report-management.component.scss',
})
export class ReportManagementComponent {
  title: string = 'Report Management';
  id: string | null = null;
  report!: Report;
  reports: Report[] = [];
  reporter!: User;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private reportService: ReportManagementService,
    private userService: UserManagementService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.extractIdFromRoute();
  }

  private extractIdFromRoute(): void {
    this.subscriptions.add(
      this.activateRoute.paramMap.subscribe((params) => {
        this.id = params.get('id');
        if (this.id) {
          this.loadReport(this.id);
        }
      })
    );
  }

  private loadReporter(reporterId: string) {
    this.subscriptions.add(
      this.userService.getUserById(reporterId).subscribe({
        next: (reporter: User) => {
          this.reporter = reporter;
        },
        error: (error) => {
          console.log('An error occurred while fetching reporter data', error);
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch reporter data. Please try again later.'
          );
        },
      })
    );
  }

  private loadReports() {
    // Laden aller Berichte (kann entsprechend den Anforderungen angepasst werden)
  }

  private loadReport(reportId: string): void {
    this.subscriptions.add(
      this.reportService.getReportByReportId(reportId).subscribe({
        next: (report: Report) => {
          this.report = report;
          this.loadReporter(report.reporterId);
        },
        error: (error) => {
          console.log('An error occurred while fetching report data', error);
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch report data. Please try again later.'
          );
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
            'An error occurred while fetching reports by user data',
            error
          );
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch reports by user data. Please try again later.'
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
            'An error occurred while fetching reports by POI data',
            error
          );
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch reports by POI data. Please try again later.'
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
            'An error occurred while fetching reports by comment data',
            error
          );
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch reports by comment data. Please try again later.'
          );
        },
      })
    );
  }

  private updateReportStatus(reportId: string, status: string): void {
    this.subscriptions.add(
      this.reportService.updateReportStatus(reportId, status).subscribe({
        next: () => {
          console.log('Report status updated successfully');
          this.toastService.show(
            'success',
            'Success',
            'Report status updated successfully'
          );
        },
        error: (error) => {
          console.log(
            'An error occurred while updating the report status',
            error
          );
          this.toastService.show(
            'error',
            'Error',
            'Failed to update report status. Please try again later.'
          );
        },
      })
    );
  }

  updateReportStatusToReviewed(report: Report): void {
    if (report.status !== 'REVIEWED') {
      this.updateReportStatus(report.id, 'REVIEWED');
    }
  }

  updateReportStatusToPending(report: Report): void {
    if (report.status !== 'PENDING') {
      this.updateReportStatus(report.id, 'PENDING');
    }
  }

  updateReportStatusToDismissed(report: Report): void {
    if (report.status !== 'DISMISSED') {
      this.updateReportStatus(report.id, 'DISMISSED');
    }
  }

  updateReportStatusToResolved(report: Report): void {
    if (report.status !== 'RESOLVED') {
      this.updateReportStatus(report.id, 'RESOLVED');
    }
  }

  ngOnDestroy() {
    // Abmelden von allen Abonnements
    this.subscriptions.unsubscribe();
  }
}
