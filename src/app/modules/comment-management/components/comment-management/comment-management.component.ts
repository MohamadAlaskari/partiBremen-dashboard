// comment-management.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommentManagementService } from '../../services/comment-management.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '../../../../shared/services/toast.service';
import { Comment } from '../../../../shared/models/comment.model';

@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrls: ['./comment-management.component.scss']
})
export class CommentManagementComponent implements OnInit, OnDestroy {

  comments: Comment[] = [];
  dataSource = new MatTableDataSource<Comment>();

  private subscriptions: Subscription = new Subscription();

  constructor(
    private commentManagementService: CommentManagementService,
    private toastService: ToastService
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

  toggleOptionsMenu(commentId: string): void {
    if(this.selectedCommentId === commentId) {
      this.selectedCommentId = null;
    }
    else {
      this.selectedCommentId = commentId;
    }
  }

  editComment(comment: Comment): void {

  }

  updateComment(comment: Comment): void {

  }

  deleteComment(comment: Comment): void {
    
  }

}
