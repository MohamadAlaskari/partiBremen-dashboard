import { Component } from '@angular/core';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  title: string = 'Create New User';

  userForm!: FormGroup;

  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),  // Hier "dob" statt "date"
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      verified: new FormControl(false),
      role: new FormControl('', Validators.required),
      active: new FormControl(false),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User created successfully', response);
        },
        error: (error) => {
          console.error('Error creating user', error);
        },
      });
    }
  }
}
