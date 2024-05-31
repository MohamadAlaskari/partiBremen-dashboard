import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagementComponent } from './components/report-management/report-management.component';

const routes: Routes = [
  {
    path: 'report-management',
    component: ReportManagementComponent,
  },
  {
    path: 'report-management/:id',
    component: ReportManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportManagementRoutingModule {}
