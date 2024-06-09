import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ToastService } from '../../services/toast.service';
import { UserManagementService } from '../../../modules/user-management/services/user-management-service/user-management.service';
import { Comment, Poi } from '../../../core/models/partiBremen.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HomeService } from '../../../modules/home/services/home.service';
declare var bootstrap: any;

@Component({
  selector: 'app-poi-modal',
  templateUrl: './poi-modal.component.html',
  styleUrl: './poi-modal.component.scss',
})
export class PoiModalComponent {
  @Input() selectedPoi: Poi | null = null;
  @Input() modalId: string = 'poiModal';
  @ViewChild('poiModal') poiModal!: ElementRef;

  selectedReportType: string = '';
  selectedReportItemId: any;
  title: string = '';
  reportForm!: FormGroup;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private authService: AuthService,
    private userService: UserManagementService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      kommentar: ['', Validators.required],
    });
  }

  selectReport(type: string, id: any, title: string) {
    this.selectedReportType = type;
    this.selectedReportItemId = id;
    this.title = title;
  }

  addComment(
    poiId: string,
    commentText: string,
    commentInput: HTMLInputElement
  ): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toastService.show('error', 'Error', 'User not logged in');
      return;
    }

    const sub = this.userService
      .createComment(commentText, currentUser.id, poiId)
      .subscribe({
        next: (createdComment: Comment) => {
          if (this.selectedPoi) {
            this.selectedPoi.comments.push(createdComment);
            this.selectedPoi.comments.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            this.cdr.detectChanges(); // Trigger change detection
          }
          commentInput.value = ''; // Clear the input field
          this.toastService.show(
            'success',
            'Success',
            'Comment added successfully'
          );
        },
        error: () => {},
      });
    this.subscriptions.add(sub);
  }

  getVoteCount(poiId: string, voteType: string): number {
    const poi = this.selectedPoi;
    if (poi) {
      return poi.votings.filter((v) => v.voteType === voteType).length;
    }
    return 0;
  }

  getInitials(name: string, surname: string): string {
    const fname = name.charAt(0).toUpperCase();
    const fsurname = surname.charAt(0).toUpperCase();
    return fname + fsurname;
  }

  trackByCommentId(index: number, comment: any): number {
    return comment.id;
  }

  Submitreport() {
    const currentUser = this.authService.getCurrentUser();
    const creatorId = currentUser?.id || '';
    if (this.reportForm.valid) {
      const reportData = {
        title: this.reportForm.get('title')?.value,
        kommentar: this.reportForm.get('kommentar')?.value,
        creatorId: creatorId,
        itemId: this.selectedReportItemId,
      };

      let reportObservable;

      switch (this.selectedReportType) {
        case 'poi':
          reportObservable = this.homeService.createpoireport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
        case 'user':
          reportObservable = this.homeService.createuserreport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
        case 'comment':
        default:
          reportObservable = this.homeService.createcommentreport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
      }

      reportObservable.subscribe({
        next: (response) => {
          console.log(`${this.selectedReportType} report created:`, response);
          window.location.reload();
        },
        error: (error) => {
          console.error(
            `Error creating ${this.selectedReportType} report:`,
            error
          );
        },
      });
    }
  }

  closeForm() {
    this.selectedReportType = '';
    this.selectedReportItemId = null;
  }

  openModal(): void {
    const modalElement = this.poiModal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
