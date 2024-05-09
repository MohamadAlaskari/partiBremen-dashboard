import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementService } from './services/user-management-service/user-management.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';

///
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    AddUserComponent,
    ViewUserComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    //
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [UserManagementService],
})
export class UserManagementModule {}
