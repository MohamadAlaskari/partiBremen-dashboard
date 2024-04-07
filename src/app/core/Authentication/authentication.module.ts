import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule

  ],
  exports: [],
  providers: [AuthService],

})
export class AuthenticationModule { }
