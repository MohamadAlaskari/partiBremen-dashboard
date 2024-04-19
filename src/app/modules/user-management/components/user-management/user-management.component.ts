import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent {
  users = [
    {
      id: 1,
      name: 'moric',
      userName: 'moric',
      date: '20.03.1996',
      email: 'moric@email.com',
      status: 'active',
    },
    {
      id: 2,
      name: 'Arne',
      userName: 'moric',
      date: '20.03.1996',
      email: 'arne@email.com',
      status: 'active',
    },
    {
      id: 3,
      name: 'Omar',
      userName: 'moric',
      date: '20.03.1996',
      email: 'moric@email.com',
      status: 'active',
    },
    {
      id: 4,
      name: 'Sudki',
      userName: 'moric',
      date: '20.03.1996',
      email: 'moric@email.com',
      status: 'active',
    },
  ];
}
