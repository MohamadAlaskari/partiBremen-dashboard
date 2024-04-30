import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { error } from 'console';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  counters: CounterState[] = [];

  columns: { header: string; field: string }[] = [
    { header: 'Verified', field: 'verified' },
    { header: 'Name', field: 'name' },
    { header: 'Surname', field: 'surname' },
    { header: 'Email', field: 'email' },
    { header: 'Date of Birth', field: 'dob' },
    { header: 'Role', field: 'role' },
    { header: 'Status', field: 'active' },
  ];
  dataSource = new MatTableDataSource<User>();

  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';
  isSortDropdownActive = false;

  private subscriptions: Subscription = new Subscription();
  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {
    this.loadUsers();
  }

  ngOnInit() {}
  toggleDropdown(): void {
    this.isSortDropdownActive = !this.isSortDropdownActive;
  }
  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.filteredUsers = users;
          this.dataSource.data = users;
          this.updateCounters();
          this.toastService.show(
            'success',
            'Success',
            'Users loaded successfully'
          );
        },
        error: (err) => {
          console.log('Failed to load users by subscribtion data (user-list.component.ts)', err);
          this.toastService.show('error', 'Error', 'Failed to load users');
        },
      })
    );
  }
  updateCounters(): void {
    this.counters = [
      {
        count: this.users.filter((user) => user.active).length,
        label: 'Aktiv',
      },
      {
        count: this.users.filter((user) => user.role === 'admin').length,
        label: 'Admin',
      },
      {
        count: this.users.filter((user) => user.verified).length,
        label: 'Verified',
      },
      { count: this.users.length, label: 'Total Users' },
    ];
  }

  filterUsers(): void {
    console.log(this.searchText);
    this.filteredUsers = this.users.filter((user) => {
      return (
        user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.surname.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
