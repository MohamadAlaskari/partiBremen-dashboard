import { Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  showSidebar: boolean = false;
  @Input() hidden = false;
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  constructor() {}
}
