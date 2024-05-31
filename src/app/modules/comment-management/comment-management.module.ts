import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentManagementComponent } from './components/comment-management/comment-management.component';
import { CommentManagementService } from './services/comment-management.service';
import { CommentManagementRoutingModule } from './comment-management-routing.module';
import { CommentDetailsModalComponent } from './components/comment-details-modal/comment-details-modal.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CommentManagementComponent,
    CommentDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    CommentManagementRoutingModule,
    SharedModule,
  ],
  providers: [CommentManagementService]

})
export class CommentManagementModule { }
