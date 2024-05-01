import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-taps',
  templateUrl: './taps.component.html',
  styleUrl: './taps.component.scss',
})
export class TapsComponent {
  @Output() tabChanged = new EventEmitter<string>(); // Event, das ausgelöst wird, wenn ein Tab gewechselt wird
  constructor() {}

  onTabChange(tab: string): void {
    this.tabChanged.emit(tab); // Sendet den ausgewählten Tab an den übergeordneten Container
  }
  handleTabChange(selectedTab: string): void {
    console.log('Tab changed to: ', selectedTab);
    // Implementieren Sie hier die Logik, die auf der Basis des ausgewählten Tabs ausgeführt werden soll
  }
}
