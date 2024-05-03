import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input()
  columnDefinitions!: {
    header: string;
    field: string;
    cellTemplate?: TemplateRef<any>;
  }[];

  @Input()
  dataSource!: MatTableDataSource<any>; // Ensure that this is correctly passed from the parent component

  displayedColumns: string[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit() {
    // Assuming columnDefinitions are properly passed and not null or undefined
    this.displayedColumns = this.columnDefinitions.map((cd) => cd.field);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; // Stellen Sie sicher, dass der Paginator auch hier initialisiert wird
  }
}
