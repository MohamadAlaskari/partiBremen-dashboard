import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MeinepoiComponent } from './components/meinepoi/meinepoi.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [HomeComponent, MeinepoiComponent],
  imports: [CommonModule, HomeRoutingModule, FormsModule,ReactiveFormsModule,SharedModule],
})
export class HomeModule {}
