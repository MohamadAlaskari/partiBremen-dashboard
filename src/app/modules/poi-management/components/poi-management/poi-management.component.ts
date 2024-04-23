import { Component } from '@angular/core';

@Component({
  selector: 'app-poi-management',
  templateUrl: './poi-management.component.html',
  styleUrl: './poi-management.component.scss'
})
export class PoiManagementComponent {
  items: any[] = [];

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        id: 1,
        name: 'Baum',
        date: '20.03.1996',
        status: 'In Planung',
      },
      {
        id: 2,
        name: 'Butze',
        date: '20.03.1996',
        status: 'Wird gebaut',
      },
      {
        id: 3,
        name: 'zweiter Flughafen',
        date: '20.03.1996',
        status: 'Fertig',
      },
      {
        id: 4,
        name: 'Dysonsphäre',
        date: '20.03.1996',
        status: 'In Planung',
      },
    ];
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
