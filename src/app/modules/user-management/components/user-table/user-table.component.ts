import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() columns: { header: string; key: string }[] = [];
  @Input() users: any[] = [];
  @Output() userAction = new EventEmitter<{ action: string; userId: number }>();

  dropdownStates: boolean[] = [];

  action: {} = { action: '', userId: '' };
  toggleDropdown(index: number): void {
    // Umschaltet nur das Dropdown des angegebenen Indexes
    this.dropdownStates[index] = !this.dropdownStates[index];

    // Optional: Schließt alle anderen Dropdowns
    this.dropdownStates = this.dropdownStates.map((state, i) =>
      i === index ? state : false
    );
  }

  ngOnInit(): void {
    // Initialisieren Sie das Zustandsarray mit false für jedes Element
    this.users.forEach(() => this.dropdownStates.push(false));
  }

  onUserAction(action: string, userId: number): void {
    this.userAction.emit({ action, userId });
  }
}
