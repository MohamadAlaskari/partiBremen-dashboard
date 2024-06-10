import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  userFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit() {
    // Automatische Umleitung zur Startseite, wenn bereits angemeldet
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  onLogin(): void {
    this.userFormSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
          this.toastService.show(
            'success',
            'Login Successful',
            `Welcome back ${user.name}!`
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Login Failed',
            'Invalid email or password.'
          );
          console.error('Login failed', error);
        },
      });
    } else {
      this.toastService.show(
        'error',
        'Validation Error',
        'Please check your input!'
      );
    }
  }
}
