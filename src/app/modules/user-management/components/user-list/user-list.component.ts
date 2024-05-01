import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  currentTab: string = 'all'; // Default-Tab
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
  searchText: string = '';

  private subscriptions: Subscription = new Subscription();

  isSortDropdownActive = false;

  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.setCustomFilterPredicate();
  }
  toggleDropdown(): void {
    this.isSortDropdownActive = !this.isSortDropdownActive;
  }
  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.dataSource.data = users;
          this.updateCounters();
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
  updateCounters(): void {
    this.counters = [
      {
        count: this.dataSource.filteredData.filter((user) => user.active)
          .length,
        label: 'Aktiv',
      },
      {
        count: this.dataSource.filteredData.filter(
          (user) => user.role === 'admin'
        ).length,
        label: 'Admin',
      },
      {
        count: this.dataSource.filteredData.filter((user) => user.verified)
          .length,
        label: 'Verified',
      },
      { count: this.dataSource.filteredData.length, label: 'Total Users' },
    ];
  }

  setCustomFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
      switch (this.currentTab) {
        case 'admins':
          return data.role === 'admin' && this.textFilter(data, filter);
        case 'active':
          return data.active && this.textFilter(data, filter);
        case 'all':
        default:
          return this.textFilter(data, filter);
      }
    };
  }

  textFilter(data: User, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    return (
      data.name?.toLowerCase().includes(transformedFilter) ||
      data.surname?.toLowerCase().includes(transformedFilter) ||
      data.email?.toLowerCase().includes(transformedFilter)
    );
  }

  filterUsers(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
  switchTab(tab: string): void {
    this.currentTab = tab;
    console.log(this.currentTab);
    this.filterUsers(); // Reapply filter whenever the tab changes
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
