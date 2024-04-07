import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [AuthService],
})
export class AuthenticationModule {}
