import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { UserManagementComponent } from './modules/user-management/components/user-management/user-management.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    //  canActivate: [authGuard],
  },
  {
    path: 'poi-management',
    component: DashboardComponent,
    // canActivate: [authGuard],
  },

  {
    path: 'comment-management',
    loadChildren: () =>
      import('./modules/comment-management/comment-management.module').then(
        (m) => m.CommentManagementModule
      ),
  },
  { path: '**', redirectTo: 'login' }, // Fallback-Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
