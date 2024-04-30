import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-management',
  templateUrl: './comment-management.component.html',
  styleUrl: './comment-management.component.scss'
})

export class CommentManagementComponent {

  comments: any[] = [];

  ngOnInit() {
      this.comments = [
        {
          id: 0,
          user: 'Max Mustermann',
          content: 'Hello World',
          date: '20.04.2020',
          time: '20:56',
        },
        {
          id: 1,
          user: 'John Doe',
          content: 'Test 123',
          date: '04.01.2002',
          time: '13:56',
        },
        {
          id: 2,
          user: 'Shawn Teusch',
          content: 'Please let this work',
          date: '29.04.2024',
          time: '06:56',
        },
      ];

  }

}
