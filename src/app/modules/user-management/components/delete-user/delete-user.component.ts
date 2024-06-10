import { Component } from '@angular/core';
import { User } from '../../../../core/models/partiBremen.model';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserManagementService } from '../../services/user-management-service/user-management.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  title: string = 'Delete Profile';
  user!: User;
  id: string | null = null;
  userFormSubmitted: boolean = false;

  // Mapping von Rollen zu ihren entsprechenden Zahlenwerten
  roleMapping: { [key: string]: number } = {
    DEFAULT: 0,
    USER: 1,
    CREATOR: 2,
    MODERATOR: 3,
    ADMIN: 4,
    DECIDER: 5,
  };

  constructor(
    private userService: UserManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.extractIdFromRoute();
  }
  private extractIdFromRoute(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
      }
    });
  }

  // Methode zur Konvertierung der Rollenbezeichnung in die entsprechende Zahl

  private loadUser(id: string): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.toastService.show(
          'success',
          'Success',
          'User deleted successfully'
        );
        setTimeout(() => {
          this.router.navigate(['/user-management']);
        }, 1000);
      },
      error: (err) => {
        console.error('Failed to delete user', err);
        this.toastService.show('error', 'Error', 'Failed to delete user');
      },
    });
  }
  onDelete(): void {
    if (this.id) {
      this.deleteUser(this.id);
    }
  }

  onCancel(): void {
    this.router.navigate(['/user-management']);
  }
}
