import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentManagementService } from '../../services/comment-management.service';
import { Comment } from '../../../../core/models/partiBremen.model';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-comment-details-modal',
  templateUrl: './comment-details-modal.component.html',
  styleUrls: ['./comment-details-modal.component.scss']
})
export class CommentDetailsModalComponent implements OnInit {
  comment: Comment | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.commentService.getCommentByID(id).subscribe(
        (comment) => {
          this.comment = comment;
        },
        (error) => {
          this.toastService.show('error', 'Error', 'Error loading comment');
        }
      );
    }
  }

  goToUser(id: string): void {
    this.router.navigate(['/user-management/view-user', id]);
  }

  goToPOI(poiId: string): void {
    this.router.navigate(['/poi-management/anzeige', poiId]);
  }
}
