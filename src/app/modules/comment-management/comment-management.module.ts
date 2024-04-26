import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';
import { CommentManagementComponent } from './components/comment-management/comment-management.component';



@NgModule({
  declarations: [
    ComponentsComponent,
    CommentManagementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentManagementModule { }
