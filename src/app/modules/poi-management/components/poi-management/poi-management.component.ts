import { Component } from '@angular/core';
import { PoiManagementService } from '../../services/poi-management.service';

@Component({
  selector: 'app-poi-management',
  templateUrl: './poi-management.component.html',
  styleUrl: './poi-management.component.scss'
})
export class PoiManagementComponent {
  items: any[] = [];

  constructor(private poiManagementService: PoiManagementService) { }

  ngOnInit() {

    this.items = [
      {
        id: 1,
        name: 'Baum',
        date: '20.03.1996',
        status: 'In Planung',
        adresse: 'Mond',
        beschreibung: 'ist cool'
      },
      {
        id: 2,
        name: 'Butze',
        date: '20.03.1996',
        status: 'Wird gebaut',
        adresse: 'Berlin',
        beschreibung: 'beschreibung'
      },
      {
        id: 3,
        name: 'zweiter Flughafen',
        date: '20.03.1996',
        status: 'Fertig',
        adresse: 'Erdkern',
        beschreibung: 'nein'
      },
      {
        id: 4,
        name: 'Dysonsphäre',
        date: '20.03.1996',
        status: 'In Planung',
        adresse: 'New York',
        beschreibung: 'aboutakum'
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

  showPoi(poi: any) {
    this.poiManagementService.setPoi(poi)

  }
}
