import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentDetailsModalComponent } from './components/comment-details-modal/comment-details-modal.component';
import { CommentManagementComponent } from './components/comment-management/comment-management.component';

const routes: Routes = [
  {path: 'comment-management', component: CommentManagementComponent},
  {path: 'view-comment/:id', component: CommentDetailsModalComponent},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentManagementRoutingModule { }
