import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/Authentication/services/auth.service';
import { User } from '../../../shared/models/user.model';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = new User('', '');
  errorMessage: string | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Automatische Umleitung zur Startseite, wenn bereits angemeldet
    if (this.authService.isAuthenticated()) {
      // this.router.navigate(['/dashboard']);
    }
  }
  onLogin(): void {
    this.authService.login(this.user).subscribe(
      (data) => {
        console.log('Login erfolgreich', data);
        this.toastService.show('success', 'Login Successful', 'Welcome back!');

        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.toastService.show(
          'error',
          'Login Failed',
          'Invalid email or password.'
        );

        this.errorMessage =
          'Login fehlgeschlagen. Bitte überprüfe deine Eingaben.';
        console.error('Login fehlgeschlagen', error);
      }
    );
  }
}
