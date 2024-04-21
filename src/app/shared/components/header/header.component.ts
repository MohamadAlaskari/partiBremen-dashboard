import { Component } from '@angular/core';
import { AuthService } from '../../../core/Authentication/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = ' Dashboard';
  currentUser: User | null = null;
  darkMode: boolean = false;
  constructor(private authService: AuthService, private _router: Router) {}
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
  logout(): void {
    this.authService.logout();
    this._router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
