import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, FormsModule,ReactiveFormsModule],
})
export class HomeModule {}
