import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementService } from './services/user-management-service/user-management.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [UserManagementComponent, UserListComponent, AddUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [UserManagementService],
})
export class UserManagementModule {}
