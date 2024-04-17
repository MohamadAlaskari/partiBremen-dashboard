import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  items: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.items = this.dataService.getUsers();
  }

  searchTerm: string = '';

  get filteredItems() {
    return this.items.filter(item =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
