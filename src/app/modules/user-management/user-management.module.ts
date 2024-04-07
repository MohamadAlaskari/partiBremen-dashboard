import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementService } from './services/user-management.service';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [CommonModule, UserManagementRoutingModule],
  providers: [UserManagementService],
})
export class UserManagementModule {}
