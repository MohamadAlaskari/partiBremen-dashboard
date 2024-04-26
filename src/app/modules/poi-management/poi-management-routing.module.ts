import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoiManagementComponent } from './components/poi-management/poi-management.component';

const routes: Routes = [{ path: '', component: PoiManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoiManagementRoutingModule {}
