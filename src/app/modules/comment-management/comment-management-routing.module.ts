import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentManagementComponent } from './components/comment-management/comment-management.component';

const routes: Routes = [{ path: '', component: CommentManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentManagementRoutingModule {}
