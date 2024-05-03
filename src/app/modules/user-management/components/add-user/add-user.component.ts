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
  userForm!: FormGroup;

  constructor(private userService: UserManagementService) {}

  ngOnInit(): void {
    // Entfernen des doppelten new und der zusätzlichen Klammern
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      verified: new FormControl(false), // Verwenden von FormControl für bessere Klarheit
      role: new FormControl('', Validators.required),
      active: new FormControl(false),
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
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
