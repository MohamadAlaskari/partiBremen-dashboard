import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserBlockService } from '../../services/user-block/user-block.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  title: string = 'Block until';
  userId: string = '';
  userForm!: FormGroup;
  blockUntilDate!: Date;
  selectedUserId: string = '';

  @Input() columns: { header: string; key: string }[] = [];
  @Input() users: any[] = [];
  dropdownStates: boolean[] = [];

  constructor(
    private userBlockService: UserBlockService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // Initialize the dropdownStates array with false for each element
    this.users.forEach(() => this.dropdownStates.push(false));

    this.userForm = new FormGroup({
      blockUntilDate: new FormControl('', Validators.required),
    });
  }

  setSelectedUserId(id: string) {
    this.selectedUserId = id;
  }

  toggleDropdown(index: number): void {
    // Toggle only the dropdown of the specified index
    this.dropdownStates[index] = !this.dropdownStates[index];

    // Optional: Close all other dropdowns
    this.dropdownStates = this.dropdownStates.map((state, i) =>
      i === index ? state : false
    );
  }

  blockUser(userId: string) {
    this.userBlockService.blockUser(userId).subscribe(
      (response) => {
        console.log('User blocked successfully', response);
        this.toastService.show('success', 'Success', 'User blocked successfully');
        this.router.navigate(['/user-management']);
        window.location.reload();
      },
      (error) => {
        console.error('Error unblocking user:', error);
        this.toastService.show('error', 'Error', 'Failed to block user. Please try again later');
      }
    );
  }

  unblockUser(userId: string) {
    this.userBlockService.unblockUser(userId).subscribe(
      (response) => {
        console.log('User unblocked successfully', response);
        this.toastService.show('success', 'Success', 'User unblocked successfully');
        this.router.navigate(['/user-management']);
        window.location.reload();
      },
      (error) => {
        console.error('Error unblocking user:', error);
        this.toastService.show('error', 'Error', 'Failed to unblock user. Please try again later');
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid && this.selectedUserId) {
       const blockUntilDate = this.userForm.get('blockUntilDate')?.value;

      this.userBlockService.blockUser(this.selectedUserId, new Date(blockUntilDate)).subscribe({
        next: (response) => {
          console.log('User blocked successfully', response);
          this.toastService.show('success', 'Success', 'User blocked successfully');
          this.router.navigate(['/user-management']);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error blocking user', error);
          this.toastService.show('error', 'Error', 'Failed to block user. Please try again later');
        },
      });
    }
  }

  onCancel(): void {
    this.userForm.reset();

    this.router.navigate(['/user-management']);
  }
}
