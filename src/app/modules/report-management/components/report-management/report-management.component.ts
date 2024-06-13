import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ReportManagementService } from '../../services/report-management.service';
import { Report, User ,Poi ,Comment } from '../../../../core/models/partiBremen.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { CommentManagementService } from '../../../comment-management/services/comment-management.service';
import { UserBlockService } from '../../../user-management/services/user-block/user-block.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrl: './report-management.component.scss',
})
export class ReportManagementComponent {
  toggleReportedSection() {
    this.showReportedSection = true;
    this.showPoiSection = false;
  }

  togglePoiSection() {
    this.showPoiSection = true;
    this.showReportedSection = false;
  }
  title: string = 'Report Management';
  id: string | null = null;
  showReportedSection: boolean = false;
  showPoiSection: boolean = false;
  report!: Report;
  reports: Report[] = [];
  pois: Poi[] = [];

  repcomment: string | null = null;
  reppoi: string | null = null;
  repuser: string | null = null;

  div: string = "";

  reported!: User| null;

  reporter!: User ;
  Poi!: Poi | null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private reportService: ReportManagementService,
    private userService: UserManagementService,
    private commentservice: CommentManagementService,
    private activateRoute: ActivatedRoute,
    private userBlockService: UserBlockService,
    private changeDetector: ChangeDetectorRef,
    private ngZone: NgZone,
    private toastService: ToastService
  ) {}
  trackById(index: number, item: any): string {
    return item.id;
  }
  ngOnInit() {

    this.extractIdFromRoute();

  }
  setuser(commentId: string, commenterId: string) {
    if (commentId === this.repcomment) {
      this.repuser = commenterId;
      console.log(this.repuser)
    } else {
      this.repuser = null; // Reset repuser if commentId does not match repcomment
    }
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

  private loadReport(reportId: string): void {

    this.subscriptions.add(
      this.reportService.getReportByReportId(reportId).subscribe({
        next: (report: Report) => {
          this.report = report;
      if(this.report.status=='PENDING'){
        this.updateReportStatusToReviewed(this.report);
     }
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
            this.ngZone.run(() => {
              this.repcomment = null;
              this.reppoi= null;
              this.changeDetector.detectChanges();
            });
            // Reset repcomment and ensure change detection picks it up

          }  if (this.report.reportedCommentId) {

            this.togglePoiSection();
            this.loadReportsByReportedCommentsId(this.report.reportedCommentId);
            this.ngZone.run(() => {
              this.reppoi = null;
              this.changeDetector.detectChanges();
            });
          }  if (this.report.reportedPoiId) {

            this.loadReportsByReportedPoiId(this.report.reportedPoiId, this.report.id);
            this.loadPoi(this.report.reportedPoiId);
            this.togglePoiSection();
            this.ngZone.run(() => {
              this.repcomment = null;
              this.repuser= null;
              this.changeDetector.detectChanges();
            });
          }
        },
      })
    );
  }
  loadPoi(reportedPoiId: string) : void  {
    this.reppoi=reportedPoiId;
    const sub = this.userService.getPoibyId(reportedPoiId).subscribe({
      next: (poi: Poi) => {
        this.Poi = poi;
        console.log('selected poi:', this.Poi);
      },
      error: () => {
        console.log(
          'An error occurred while fetching reports by user data',
        );
      },
    });
    this.subscriptions.add(sub);

  }



  private loadReportsByReportedUserId(reportedUserId: string) {

    this.repuser = reportedUserId;

    this.subscriptions.add(
      this.reportService.getReportsByUserId(reportedUserId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports.filter(report => report.id !== this.report.id);
          // Toggle the reported section visibility here
          this.toggleReportedSection();
        },
        error: (error) => {
          console.log('An error occurred while fetching reports by user data', error);
          this.toastService.show(
            'error',
            'Error',
            'Failed to fetch reports by user data. Please try again later.'
          );
        },
      })
    );
    this.loadUserById(reportedUserId);
  }
  loadUserById(userId: string): void {
    this.subscriptions.add(
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
this.reported =user;
        },
        error: (err) => console.error('Error loading user:', err),
      })
    );
  }
  private loadReportsByReportedPoiId(reportedPoiId: string, repid: string) {
    this.subscriptions.add(
      this.reportService.getReportsByPoiId(reportedPoiId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports.filter(report => report.id !== repid);
          console.log("our reports", this.reports);
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
    this.repcomment = reportedCommentsId;
    this.subscriptions.add(
      this.reportService.getReportsByCommentId(reportedCommentsId).subscribe({
        next: (reports: Report[]) => {
          this.reports = reports.filter(report => report.id !== this.report.id);;
          this.loadPoibycomment(reportedCommentsId);
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
  loadPoibycomment(reportedCommentsId: string) {
    const sub = this.userService.getPois().subscribe({
      next: (pois: Poi[]) => {
        this.pois = pois;
        console.log("All POIs", this.pois);

        // Filter POIs by reportedCommentsId and select the first one if any
        const filteredPois = this.pois.filter(poi =>
          poi.comments.some(comment => comment.id === reportedCommentsId)
        );

        this.Poi = filteredPois.length > 0 ? filteredPois[0] : null;

        console.log("Filtered POI", this.Poi);
      },
      error: (error) => {
        console.error('Error loading POIs', error);
      },
    });

    this.subscriptions.add(sub);
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
          this.ngOnInit();
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
      this.reports.forEach(report => {
        if (report.status !== 'REVIEWED') {
          this.updateReportStatus(report.id, 'REVIEWED');
        }
      });
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
      this.reports.forEach(report => {
        if (report.status !== 'DISMISSED') {
          this.updateReportStatus(report.id, 'DISMISSED');
        }
      });
    }
  }

  updateReportStatusToResolved(report: Report): void {
    if (report.status !== 'RESOLVED') {
      this.updateReportStatus(report.id, 'RESOLVED');
      this.reports.forEach(report => {
        if (report.status !== 'RESOLVED') {
          this.updateReportStatus(report.id, 'RESOLVED');

        }
      });
      Swal.fire({
        text: " Report RESOLVED successfully.",
        icon: "success"
      });

    }
  }

  ngOnDestroy() {
    // Abmelden von allen Abonnements
    this.subscriptions.unsubscribe();
  }


  blockuser(Id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this user !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userBlockService.blockUser(Id).subscribe(
          (response) => {
            console.log('User blocked successfully', response);

            this.toastService.show(
              'success',
              'Success',
              'User blocked successfully.'
            );
            this.updateReportStatusToResolved(this.report);

          },
          (error) => {
            this.toastService.show('error', 'Error', 'Failed to block user. Please try again later');
          }
        );
      }
    });




  }
  deletepoi(reporterId: string) {
  throw new Error('Method not implemented.');
  }
  deletecomment(id: string) : void {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this comment !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentservice.deleteComment(id).subscribe({
          next: () => {
            this.toastService.show(
              'success',
              'Success',
              'comment deleted successfully'
            );
            this.updateReportStatusToResolved(this.report);
          },
          error: (err) => {
            this.toastService.show('error', 'Error', 'Failed to delete comment');
          },
        });
      }
    });




  }





}
