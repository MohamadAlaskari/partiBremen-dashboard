import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

const routes: Routes = [
  {
    path: 'user-management',
    component: UserManagementComponent,
    children: [
      {
        path: 'add-user',
        component: AddUserComponent,
      },
    ],
  },

  {
    path: 'delete-user/:id',
    component: DeleteUserComponent,
  },
  {
    path: 'update-user/:id',
    component: UpdateUserComponent,
  },
  {
    path: 'view-user/:id',
    component: ViewUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
