// poi-management.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoiManagementComponent } from './components/poi-management/poi-management.component';
import { PoiManagementRoutingModule } from './poi-management-routing.module';
import { PoiManagementService } from './services/poi-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoiAnzeigeComponent } from './components/poi-anzeige/poi-anzeige.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';
import { SharedModule } from '../../shared/shared.module';
import { SurveyListComponent } from '../survey-management/components/survey-list/./survey-list.component';
import { SurveyAnzeigeComponent } from '../survey-management/components/survey-anzeige/survey-anzeige.component';

@NgModule({
  declarations: [PoiManagementComponent, PoiAnzeigeComponent, PoiListComponent, SurveyListComponent, SurveyAnzeigeComponent],
  imports: [
    CommonModule,
    PoiManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [PoiManagementService],
})
export class PoiManagementModule {}
