import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './core/Authentication/services/auth.service';
import { ToastService } from './shared/services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    public toastService: ToastService
  ) {
    this.toastService.show(
      'success',
      'Success!',
      'Your message has been sent successfully.'
    );
    this.toastService.show(
      'error',
      'Error!',
      'Change a few thing up and try submitting again.'
    );
    this.toastService.show(
      'warning',
      'Warning!',
      'Change a few thing up and try submitting again.'
    );
    this.toastService.show(
      'info',
      'Info!',
      'Change a few thing up and try submitting again.'
    );
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
