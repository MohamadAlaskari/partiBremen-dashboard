import { Component } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  users: User[] = [];
  private subscriptions: Subscription = new Subscription();
  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {
    this.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
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
  loadUserById(userId: string): void {
    this.subscriptions.add(
      this.userManagementService.getUserById(userId).subscribe({
        next: (user) => {
          // Handle the loaded user data here (e.g., for display or editing)
        },
        error: (err) => console.error('Error loading user:', err),
      })
    );
  }

  createUser(user: User): void {
    this.subscriptions.add(
      this.userManagementService.createUser(user).subscribe({
        next: (newUser) => {
          this.users.push(newUser); // Optionally add the new user to the list
          console.log('User created successfully:', newUser);
          this.toastService.show(
            'success',
            'Success',
            `User created successfully: ${newUser.name}`
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error creating user: ${error.message}`
          );
        },
      })
    );
  }

  updateUser(userId: string, user: User): void {
    this.subscriptions.add(
      this.userManagementService.updateUser(userId, user).subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex((u) => u.id === updatedUser.id);
          this.users[index] = updatedUser;
          this.toastService.show(
            'success',
            'Success',
            `User updated successfully: ${updatedUser.name}`
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error updating user: ${error.message}`
          );
        },
      })
    );
  }

  deleteUser(userId: string): void {
    this.subscriptions.add(
      this.userManagementService.deleteUser(userId).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== userId);
          this.toastService.show(
            'success',
            'Success',
            'User deleted successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error deleting user: ${error.message}`
          );
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
