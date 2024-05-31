import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentManagementComponent } from './components/comment-management/comment-management.component';
import { CommentManagementService } from './services/comment-management.service';
import { CommentManagementRoutingModule } from './comment-management-routing.module';
import { CommentDetailsModalComponent } from './components/comment-details-modal/comment-details-modal.component';


@NgModule({
  declarations: [
    CommentManagementComponent,
    CommentDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    CommentManagementRoutingModule
  ],
  providers: [CommentManagementService]

})
export class CommentManagementModule { }
