import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  constructor(private router: Router) {}
  navigateToDashboard() {
    this.router.navigate(['/dashboard'])
  }
  navigateToUserManagement() {
    this.router.navigate(['/user-management'])
  }
}
