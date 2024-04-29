import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input()
  columnDefinitions!: { header: string; field: string }[]; // Jetzt ein Array von Objekten
  @Input()
  dataSource!: MatTableDataSource<any>; // Die Datenquelle wird von außen übergeben
  constructor() {
    console.log('from tabel', this.dataSource);
    console.log('from tabel', this.columnDefinitions);
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
