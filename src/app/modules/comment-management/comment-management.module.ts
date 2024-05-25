import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentManagementComponent } from './components/comment-management/comment-management.component';
import { CommentManagementRoutingModule } from './comment-management-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CommentManagementComponent],
  imports: [CommonModule, CommentManagementRoutingModule, SharedModule],
})
export class CommentManagementModule {}
