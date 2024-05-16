// poi-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PoiManagementService } from '../../services/poi-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { Poi } from '../../../../shared/models/poi.model';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  // Datenquelle für Material Table.
  dataSource = new MatTableDataSource<Poi>();

  constructor(
    protected poiManagementService: PoiManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

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
    this.waitForCurrentPoi()
    this.router.navigate(['poi-management/anzeige']);
  }

  private waitForCurrentPoi(): Promise<any> {
    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        const currentPoi = this.poiManagementService.currentPoi;
        if (currentPoi) {
          clearInterval(intervalId);
          resolve(currentPoi);
        }
      }, 500); // Prüfen Sie jede Sekunde
    });
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
