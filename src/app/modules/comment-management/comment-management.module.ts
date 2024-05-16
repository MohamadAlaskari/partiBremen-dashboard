import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommentManagementComponent } from './components/comment-management/comment-management.component';


@NgModule({
  declarations: [
    CommentManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentManagementModule { }
