import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = new User('', '', '', '', '', null, '', '', false);

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Automatische Umleitung zur Startseite, wenn bereits angemeldet
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }
  onLogin(): void {
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (user) => {
        this.router.navigate(['/dashboard']);
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
        console.error('Login fehlgeschlagen', error);
      },
    });
  }
}
