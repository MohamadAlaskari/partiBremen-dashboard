import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: 'user-management',
    component: UserManagementComponent,
    children: [
      {
        path: 'view-user',
        component: AddUserComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'update-user',
        component: AddUserComponent,
      },
      {
        path: 'delete-user',
        component: AddUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
