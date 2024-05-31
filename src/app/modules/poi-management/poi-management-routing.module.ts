import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoiAnzeigeComponent } from './components/poi-anzeige/poi-anzeige.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';
import {SurveyListComponent} from "../survey-management/components/survey-list/./survey-list.component";
import {SurveyAnzeigeComponent} from "../survey-management/components/survey-anzeige/survey-anzeige.component";

const routes: Routes = [
  { path: 'liste', component: PoiListComponent },
  { path: 'anzeige/:id', component: PoiAnzeigeComponent },
  { path: 'surveys/:id', component: SurveyListComponent },
  { path: 'survey-anzeige/:id', component: SurveyAnzeigeComponent},
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoiManagementRoutingModule { }
