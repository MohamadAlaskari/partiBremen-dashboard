import { Component, Input } from '@angular/core';
import { User } from '../../../core/models/partiBremen.model';
import { CounterState } from '../state-counter/state-counter.component';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  @Input() user!: User;
  @Input() counters?: CounterState[]; // Optional input
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }
  getInitials(name: string, surname: string): string {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  }
}
