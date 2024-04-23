import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoiManagementComponent } from './components/poi-management/poi-management.component';
import { PoiManagementRoutingModule } from './poi-management-routing.module';
import { PoiManagementService } from './services/poi-management.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [PoiManagementComponent],
  imports: [CommonModule, PoiManagementRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [PoiManagementService],
})
export class PoiManagementModule {}
