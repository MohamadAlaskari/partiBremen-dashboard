import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() columns: { header: string; key: string }[] = [];
  @Input() users: any[] = [];

  dropdownActive: boolean = false;

  ngOnInit() {
    // Assuming columnDefinitions are properly passed and not null or undefined
  }

  ngAfterViewInit() {}

  toggleDropdown() {
    this.dropdownActive = !this.dropdownActive;
  }
}
