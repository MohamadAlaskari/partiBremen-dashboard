import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementService } from './services/user-management-service/user-management.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAdditionComponent } from './components/user-addition/user-addition.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserManagementComponent,
    UserListComponent,
    UserAdditionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserManagementRoutingModule,
    SharedModule,
  ],
  providers: [UserManagementService],
})
export class UserManagementModule {}
