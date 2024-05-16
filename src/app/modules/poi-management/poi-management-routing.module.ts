import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoiAnzeigeComponent } from './components/poi-anzeige/poi-anzeige.component';
import { PoiListComponent } from './components/poi-list/poi-list.component';

const routes: Routes = [
  { path: 'liste', component: PoiListComponent },
  { path: 'anzeige', component: PoiAnzeigeComponent },
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoiManagementRoutingModule { }
