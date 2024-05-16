import { Component } from '@angular/core';
import { User } from '../../../../shared/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserManagementService } from '../../services/user-management-service/user-management.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  title: string = 'Delete User';
  user!: User;
  id: string | null = null;
  userForm!: FormGroup;
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
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
      }
    });
  }

  private initForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      surname: new FormControl(this.user.surname, Validators.required),
      dob: new FormControl(this.user.dob, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', Validators.required),
      verified: new FormControl(this.user.verified),
      role: new FormControl(
        this.getRoleValue(this.user.role || 'DEFAULT'),
        Validators.required
      ),
      active: new FormControl(this.user.active),
    });
  }

  // Methode zur Konvertierung der Rollenbezeichnung in die entsprechende Zahl
  private getRoleValue(role: string): number {
    return this.roleMapping[role] || 0; // Fallback auf 0 (DEFAULT) falls die Rolle nicht gefunden wird
  }
  private loadUser(id: string): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
      this.initForm();
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
    this.userForm.reset();
    this.router.navigate(['/user-management']);
  }
}
