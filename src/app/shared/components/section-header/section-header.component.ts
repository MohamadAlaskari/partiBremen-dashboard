import { Component, Input } from '@angular/core';

export interface SectionHeader {
  title: string;
}
@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  @Input() title: String = '';
}
