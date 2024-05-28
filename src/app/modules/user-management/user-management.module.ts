import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementService } from './services/user-management-service/user-management.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';

import { MatIconModule } from '@angular/material/icon';
import { UserBlockComponent } from './components/user-block/user-block.component';
import { UserBlockService } from './services/user-block/user-block.service';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    AddUserComponent,
    ViewUserComponent,
    UserTableComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    UserBlockComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [
    UserManagementService,
    UserBlockService,
    DatePipe,
  ],
})
export class UserManagementModule {}
