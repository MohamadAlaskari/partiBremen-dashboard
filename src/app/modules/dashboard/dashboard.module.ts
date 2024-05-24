import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { UserManagementService } from '../user-management/services/user-management-service/user-management.service'
import { PoiManagementService } from '../poi-management/services/poi-management.service';

@NgModule({
  providers: [UserManagementService,PoiManagementService,provideCharts(withDefaultRegisterables())],
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
