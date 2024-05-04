import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columns: { header: string; key: string }[] = [];
  @Input() data: any[] = [];

  ngOnInit() {
    // Assuming columnDefinitions are properly passed and not null or undefined
  }

  ngAfterViewInit() {}
}
