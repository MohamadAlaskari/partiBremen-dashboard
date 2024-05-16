import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnDestroy {
  action = { action: '', userId: '' };
  inhaltConfimModel = {
    title: 'Delete User',
    body: 'Sind Sie sicher, dass Sie diese Aktion ausführen möchten?',
    result: false,
  };
  users: User[] = [];
  originalUsers: User[] = [];
  tabConfig = [
    { label: 'View All', value: 'all' },
    { label: 'Admins', value: 'admins' },
    { label: 'Active', value: 'active' },
  ];
  //muss wissen nach search value oder tab value muss die daten gefiltert werden
  activeFilterType: 'tab' | 'search' = 'tab';

  currentTabFilter = 'all';

  counters: CounterState[] = [];

  columns: { header: string; key: string }[] = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Date of Birth', key: 'dob' },
    { header: 'Role', key: 'role' },
    { header: 'Active', key: 'active' },
  ];
  searchText: string = '';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.updateCounters();
  }

  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.originalUsers = users;
          this.updateCounters();

          this.applyFilters(); // Initial filter application after loading users
          this.toastService.show(
            'success',
            'Success',
            'Users loaded successfully'
          );
        },
        error: (err) => {
          console.error('Failed to load users', err);
          this.toastService.show('error', 'Error', 'Failed to load users');
        },
      })
    );
  }

  deleteUser(userId: string): void {
    this.subscriptions.add(
      this.userManagementService.deleteUser(userId).subscribe({
        next: () => {
          this.toastService.show(
            'success',
            'Success',
            'User deleted successfully'
          );
          this.loadUsers(); // Neu laden der Benutzerliste
        },
        error: (err) => {
          console.error('Failed to delete user', err);
          this.toastService.show('error', 'Error', 'Failed to delete user');
        },
      })
    );
  }

  updateCounters(): void {
    const activeUsers = this.originalUsers.filter((user) => user.active);
    const adminUsers = this.originalUsers.filter(
      (user) => user.role === 'ADMIN'
    );
    const verifiedUsers = this.originalUsers.filter((user) => user.verified);

    this.counters = [
      { count: activeUsers.length, label: 'Active' },
      { count: adminUsers.length, label: 'Admins' },
      { count: verifiedUsers.length, label: 'Verified' },
      { count: this.originalUsers.length, label: 'Total Users' },
    ];
  }

  applyFilters(): void {
    let filteredUsers = this.originalUsers.slice(); // Begin with a copy of the full user list
    if (this.currentTabFilter !== 'all') {
      filteredUsers = filteredUsers.filter((user) => {
        if (this.currentTabFilter === 'admins') return user.role === 'ADMIN';
        if (this.currentTabFilter === 'active') return user.active;
        return true; // No filter applied, show all data
      });
    }
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTextLower) ||
          user.surname?.toLowerCase().includes(searchTextLower) ||
          user.email?.toLowerCase().includes(searchTextLower) ||
          user.role?.toLocaleLowerCase().includes(searchTextLower)
      );
    }
    this.users = filteredUsers;
  }

  filterUsers(): void {
    this.activeFilterType = 'search';
    this.applyFilters();
  }

  handleTabChange(tabValue: string): void {
    this.currentTabFilter = tabValue;
    this.applyFilters();
  }

  addUser(): void {
    this.router.navigate(['/user-management/add-user']);
  }
  handleUserAction(event: { action: string; userId: string }): void {
    console.log('Action:', event.action, 'User ID:', event.userId);

    switch (event.action) {
      case 'delete':
        if (this.inhaltConfimModel.result) {
          this.deleteUser(event.userId);
          console.log('deleted');
        }
        break;
      case 'update':
        this.action = event;
        break;
      default:
        console.log('no action vorhanden');
        break;
    }
  }
  handleConfirmModalResult(result: boolean) {
    if (result) {
      // Logik zum Verarbeiten der Bestätigung
      this.inhaltConfimModel.result = result;
    } else {
      this.inhaltConfimModel.result = result;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
