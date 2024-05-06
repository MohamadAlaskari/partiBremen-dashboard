import { Component } from '@angular/core';
import { CommentManagementService } from '../../services/comment-management.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatTableDataSource } from '@angular/material/table';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { Comment } from '../../../../shared/models/comment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrl: './comment-management.component.scss'
})

export class CommentManagementComponent {

  constructor(
    private commentManagementService: CommentManagementService,
    private toastService: ToastService
  ) {}

  comments: any[] = [];

  counters: CounterState[] = [];

  dataSource = new MatTableDataSource<Comment>();

  private subscriptions: Subscription = new Subscription();

  ngOnInit() {
      this.loadComments();
  }

  loadComments(): void {
    this.subscriptions.add(
      this.commentManagementService.getComments().subscribe({
        next: (comments) => {
          this.comments = comments;
          this.dataSource.data = comments;
          this.toastService.show(
            'success',
            'Success',
            'Comments loaded successfully'
          );
        },
        error: (err) => {
          console.error('Failed to load users', err);

          this.toastService.show('error', 'Error', 'Failed to load users');
        },
      })
    );
  }

}
