import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleNotifications = new EventEmitter<void>();
  onClickToggleNotifications() {
    this.toggleNotifications.emit();
  }
  title = 'Parti Bremen';
  currentUser: User | null = null;
  darkMode: boolean = false;
  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
  logout(): void {
    if (this.currentUser) {
      this.authService.logout(this.currentUser.id).subscribe({
        next: () => {
          this.toastService.show(
            'success',
            'Success',
            'User logedot successfully'
          );

          this._router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Logout error:', error);
          this.toastService.show(
            'error',
            'Error',
            'Failed to logout user. Please try again later'
          );
        },
      });
    }
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
