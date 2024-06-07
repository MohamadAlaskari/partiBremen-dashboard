import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services/toast.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@NgModule({ declarations: [LoginComponent],
    exports: [LoginComponent], imports: [CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [AuthService, ToastService, provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule {}
