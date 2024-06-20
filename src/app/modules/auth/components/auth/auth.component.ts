import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  switchToLoginMode() {
    this.isLoginMode = true;
  }
}
