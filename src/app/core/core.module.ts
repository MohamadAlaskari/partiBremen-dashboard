import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [CommonModule], providers: [provideHttpClient(withFetch()), provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule {}
