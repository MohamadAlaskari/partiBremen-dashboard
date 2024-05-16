import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoiManagementComponent } from './components/poi-management/poi-management.component';
import { PoiManagementRoutingModule } from './poi-management-routing.module';
import { PoiManagementService } from './services/poi-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoiAnzeigeComponent } from './components/poi-anzeige/poi-anzeige.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [PoiManagementComponent, PoiAnzeigeComponent, PoiListComponent],
  imports: [
    CommonModule,
    PoiManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [PoiManagementService, PoiListComponent, PoiAnzeigeComponent],
})
export class PoiManagementModule {}
