import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { UserManagementModule } from './modules/user-management/user-management.module';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PoiManagementModule } from './modules/poi-management/poi-management.module';
import { CommentManagementModule } from './modules/comment-management/comment-management.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportManagementModule } from './modules/report-management/report-management.module';
import { HomeModule } from './modules/home/home.module';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    CoreModule,
    SharedModule,
    DashboardModule,
    UserManagementModule,
    CommentManagementModule,
    PoiManagementModule,
    ReportManagementModule,
    HomeModule,
    MatIconModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MdbDropdownModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
