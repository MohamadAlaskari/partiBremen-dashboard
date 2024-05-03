import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { authGuard } from './modules/auth/guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { UserManagementComponent } from './modules/user-management/components/user-management/user-management.component';
import { PoiManagementComponent } from './modules/poi-management/components/poi-management/poi-management.component';
import { CommentManagementComponent } from './modules/comment-management/components/comment-management/comment-management.component';


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
    component: PoiManagementComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'comment-management',
    component: CommentManagementComponent,
    // canActivate: [authGuard],
  },
  
  { path: '**', redirectTo: 'login' }, // Fallback-Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
