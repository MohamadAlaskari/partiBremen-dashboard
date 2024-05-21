import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportManagementComponent } from './components/report-management/report-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { ReportManagementService } from './services/report-management.service';

@NgModule({
  declarations: [ReportManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [ReportManagementService],
})
export class ReportManagementModule {}
