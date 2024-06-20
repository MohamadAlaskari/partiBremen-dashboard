import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  @Output() signupSuccess = new EventEmitter<void>();
  userForm!: FormGroup;
  step = 1; // Track the current step

  constructor(
    private userService: UserManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('USER', Validators.required), // Set default value to "User"
    });
  }

  onNextStep(): void {
    if (
      this.step === 1 &&
      this.userForm.get('name')!.valid &&
      this.userForm.get('surname')!.valid &&
      this.userForm.get('dob')!.valid
    ) {
      this.step = 2;
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onPreviousStep(): void {
    this.step = 1;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User created successfully', response);
          this.toastService.show(
            'success',
            'Success',
            'User created successfully'
          );
          this.signupSuccess.emit(); // Emit the event
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.toastService.show(
            'error',
            'Error',
            'Failed to create user. Please try again later'
          );
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.userForm.reset();
    this.router.navigate(['/auth']);
  }
}
