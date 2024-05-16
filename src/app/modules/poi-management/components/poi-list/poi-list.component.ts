import { Component } from '@angular/core';
import {Poi} from "../../../../shared/models/poi.model";
import {Updatepoi} from "../../../../shared/models/updatepoi.model";
import {Subscription} from "rxjs";
import {PoiManagementService} from "../../services/poi-management.service";
import {ToastService} from "../../../../shared/services/toast.service";
import {CounterState} from "../../../../shared/components/state-counter/state-counter.component";
import {MatTableDataSource} from "@angular/material/table";
import {PoiManagementComponent} from "../poi-management/poi-management.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrl: './poi-list.component.scss'
})
export class PoiListComponent {
  private subscriptions: Subscription = new Subscription();

  // Datenquelle für Material Table.
  dataSource = new MatTableDataSource<Poi>();

  constructor(protected poiManagementService: PoiManagementService,
              private toastService: ToastService,
              private router: Router) { }

  ngOnInit() {
    this.poiManagementService.loadPois();
  }

  searchTerm: string = '';

  get filteredItems() {
    return this.poiManagementService.pois.filter(item =>
      Object.values(item).some((value: any) =>
        value !== null &&
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }


  showPoi(poi: any) {
    this.poiManagementService.currentPoi = this.poiManagementService.loadPoiById(poi.id)
  }


  getActiveCount(): number {
    return this.poiManagementService.pois.filter(item => item.active === true).length;
  }

  getInactiveCount(): number {
    return this.poiManagementService.pois.filter(item => item.active === false).length;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
