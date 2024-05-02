import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: { label: string; value: string }[] = []; // nimmt Tabs mit Labels und Werten auf

  @Output() tabChanged = new EventEmitter<string>(); // Event, das ausgelöst wird, wenn ein Tab gewechselt wird
  constructor() {}

  onTabChange(value: string): void {
    this.tabChanged.emit(value); // Sendet den ausgewählten Wert an den übergeordneten Container
  }
}
