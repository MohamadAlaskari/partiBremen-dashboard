import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: { label: string; value: string }[] = []; // nimmt Tabs mit Labels und Werten auf
  @Output() tabChanged = new EventEmitter<string>(); // Event, das ausgelöst wird, wenn ein Tab gewechselt wird

  instanceId: string;

  constructor() {
    this.instanceId = this.generateUniqueId();
  }

  ngOnInit(): void {
    // Ensure a unique instanceId is generated
    this.instanceId = this.generateUniqueId();
  }

  onTabChange(value: string, index: number): void {
    const tabElement = document.querySelector(
      `.tabs[data-instance="${this.instanceId}"]`
    ) as HTMLElement;
    if (tabElement) {
      tabElement.style.setProperty('--glider-index', index.toString());
    }
    this.tabChanged.emit(value); // Sendet den ausgewählten Wert an den übergeordneten Container
  }

  generateUniqueId(): string {
    return 'tabs-' + Math.random().toString(36).substr(2, 9);
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }
}
