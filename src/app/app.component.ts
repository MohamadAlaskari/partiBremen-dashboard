import { AuthService } from './modules/auth/services/auth.service';

import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class AppComponent  implements OnInit{
  showNotifications: boolean = true;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  ngOnInit() {
    this.toggleNotifications();
  }
  constructor(private authService: AuthService) {}
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
