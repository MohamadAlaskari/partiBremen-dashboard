import {
  Component,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { ToastService } from '../../services/toast.service';
import { User } from '../../../core/models/partiBremen.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleNotifications = new EventEmitter<void>();
  @Output() sidebarToggled = new EventEmitter<void>();

  title = 'Parti Bremen';
  currentUser: User | null = null;
  darkMode: boolean = false;
  isDropdownOpen = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private _router: Router,
    private el: ElementRef
  ) {}

  onClickToggleNotifications() {
    this.toggleNotifications.emit();
  }

  toggleSidebar() {
      this.sidebarToggled.emit();
    
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
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
