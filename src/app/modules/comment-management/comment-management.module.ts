import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CommentManagementComponent } from './components/comment-management/comment-management.component';
import { CommentManagementService } from './services/comment-management.service';
import { CommentManagementRoutingModule } from './comment-management-routing.module';
import { CommentDetailsModalComponent } from './components/comment-details-modal/comment-details-modal.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommentManagementComponent,
    CommentDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CommentManagementRoutingModule,
    SharedModule,
    MdbDropdownModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [CommentManagementService]

})
export class CommentManagementModule { }
