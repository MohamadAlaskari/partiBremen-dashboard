import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [provideHttpClient(withFetch())],
})
export class CoreModule {}
