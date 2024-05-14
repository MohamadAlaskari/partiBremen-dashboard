import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  @Input() userId: string = '';
  title: string = 'Update User';
  user?: User;
  // userId: string = '1dea076a-e832-446d-a7b7-962ae2f3c1ff';

  userForm!: FormGroup;

  constructor(
    private userService: UserManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.user = user;
      this.initForm();
    });
  }

  private initForm(): void {
    if (this.user) {
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
        role: new FormControl(this.user.role, Validators.required),
        active: new FormControl(this.user.active),
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.user, ...this.userForm.value };
      this.userService.updateUser(this.user!.id, updatedUser).subscribe({
        next: (response) => {
          this.toastService.show(
            'success',
            'Success',
            'User updated successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            'Failed to update user. Please try again later'
          );
        },
      });
    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.router.navigate(['/user-management']);
  }
}
