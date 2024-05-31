// comment-management.component.ts

import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { CommentManagementService } from '../../services/comment-management.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '../../../../shared/services/toast.service';
import { MatDialog } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { Comment } from '../../../../core/models/partiBremen.model';

@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrls: ['./comment-management.component.scss']
})
export class CommentManagementComponent implements OnInit, OnDestroy {
  title: string = "Comment Management";
  comments: Comment[] = [];
  dataSource = new MatTableDataSource<Comment>();


  private subscriptions: Subscription = new Subscription();

  constructor(
    private commentManagementService: CommentManagementService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadComments(): void {
    this.subscriptions.add(
      this.commentManagementService.getComments().subscribe({
        next: (comments) => {
          this.comments = comments;
          this.dataSource.data = comments;
          this.toastService.show('success', 'Success', 'Comments loaded successfully');
        },
        error: (err) => {
          console.error('Failed to load comments', err);
          this.toastService.show('error', 'Error', 'Failed to load comments');
        },
      })
    );
  }

  selectedCommentId: string | null = null;

  toggleDropdown(commentId: string): void {
    if(this.selectedCommentId === commentId) {
      this.selectedCommentId = null;
    }
    else {
      this.selectedCommentId = commentId;
    }
  }

  deleteComment(commentID: string): void {
    this.subscriptions.add(
      this.commentManagementService.deleteComment(commentID).subscribe({
        next: () => {
          this.comments = this.comments.filter((comment) => comment.id !== commentID);
          this.toastService.show(
            'success',
            'Success',
            'Comment deleted successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error deleting comment: ${error.message}`
          );
        },
      })
    )
  }

  viewComment(id: string): void {
    this.router.navigate(['/view-comment', id]);
  }

}
