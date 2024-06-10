import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../core/models/partiBremen.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  title: string = 'Edit Profile';
  user!: User;
  id: string | null = null;
  userForm!: FormGroup;
  userFormSubmitted: boolean = false;
  private subscription: Subscription = new Subscription();

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
      role: new FormControl(
        this.getRoleValue(this.user.role || 'DEFAULT'),
        Validators.required
      ),
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
  onSubmit(): void {
    this.userFormSubmitted = true;
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      // Log the data being sent
      this.subscription.add(
        this.userService.updateUser(this.user.id, updatedUser).subscribe({
          next: () => {
            this.toastService.show(
              'success',
              'Success',
              'User updated successfully'
            );
            setTimeout(() => {
              this.router.navigate(['/user-management']);
            }, 500);
          },
          error: (error) => {
            this.toastService.show(
              'error',
              'Error',
              'Failed to update user. Please try again later'
            );
          },
        })
      );
    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.router.navigate(['/user-management']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
