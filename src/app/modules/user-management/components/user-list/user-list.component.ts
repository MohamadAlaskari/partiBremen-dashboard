import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  isSortDropdownActive = false;
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';

  private subscriptions: Subscription = new Subscription();
  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }
  toggleDropdown(): void {
    this.isSortDropdownActive = !this.isSortDropdownActive;
  }
  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.filteredUsers = users;
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
