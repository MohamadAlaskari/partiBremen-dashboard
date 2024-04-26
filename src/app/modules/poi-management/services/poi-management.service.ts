import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoiManagementService {

  private currentpoi = {
    id: 1,
    name: 'Baum',
    date: '20.03.1996',
    status: 'In Planung',
    beschreibung: 'cooler poi',
    adresse: 'Bremen'
  };

  constructor() { }

  getPoi() {
      return this.currentpoi;
  }

  setPoi(poi: any) {
      this.currentpoi = poi;
  }
}
