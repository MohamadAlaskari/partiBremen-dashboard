import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MeinepoiComponent } from './components/meinepoi/meinepoi.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
  { path: 'meinepoi', component: MeinepoiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
