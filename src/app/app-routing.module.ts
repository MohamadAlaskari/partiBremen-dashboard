import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportManagementComponent } from './modules/report-management/components/report-management/report-management.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
    // canActivate: [AuthGuard],
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'report-management',
    component: ReportManagementComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./modules/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'poi-management',

    loadChildren: () =>
      import('./modules/poi-management/poi-management.module').then(
        (m) => m.PoiManagementModule
      ),
    //  canActivate: [AuthGuard],
  },
  {
    path: 'comment-management',

    loadChildren: () =>
      import('./modules/comment-management/comment-management.module').then(
        (m) => m.CommentManagementModule
      )
    // canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, // Fallback-Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
