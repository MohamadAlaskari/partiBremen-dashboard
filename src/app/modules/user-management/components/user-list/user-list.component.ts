import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';

interface Tab {
  name: string;
  translateValue: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  tabs: Tab[] = [
    { name: 'view all', translateValue: '0%' },
    { name: 'verfiziert', translateValue: '100%' },
    { name: 'Following', translateValue: '200%' },
  ];
  selectedTab: string = this.tabs[0].name; // Default to the first tab
  sliderTransform: string = `translateX(${this.tabs[0].translateValue})`;

  users: User[] = [];
  private subscriptions: Subscription = new Subscription();
  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }
  selectTab(tab: Tab): void {
    this.selectedTab = tab.name;
    this.sliderTransform = `translateX(${tab.translateValue})`;
  }

  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.toastService.show(
            'success',
            'Success',
            'Users loaded successfully'
          );
        },
        error: (err) => {
          this.toastService.show('error', 'Error', 'Failed to load users');
        },
      })
    );
  }
  countUsers(): number {
    return this.users.length;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
