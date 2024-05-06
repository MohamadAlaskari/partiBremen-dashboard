import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { UserManagementComponent } from './modules/user-management/components/user-management/user-management.component';
import { PoiManagementComponent } from './modules/poi-management/components/poi-management/poi-management.component';
import { CommentManagementComponent } from './modules/comment-management/components/comment-management/comment-management.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { isAuthenticatedGuard } from './modules/auth/guards/isAuthenticated.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [isAuthenticatedGuard],
    component: LoginComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./modules/user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'poi-management',
    component: PoiManagementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'comment-management',
    component: CommentManagementComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'login' }, // Fallback-Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
