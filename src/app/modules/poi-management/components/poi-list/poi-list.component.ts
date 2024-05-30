// poi-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PoiManagementService } from '../../services/poi-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import {Poi} from "../../../../core/models/partiBremen.model";

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected title_poiManagment: string = 'POI Management';

  constructor(
    protected poiManagementService: PoiManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPois();
  }

  getPois(): void {
    this.subscriptions.add(
      this.poiManagementService.getPois().subscribe({
        next: (pois) => {
          this.poiManagementService.pois = pois;
          this.poiManagementService.dataSource.data = pois;
          this.poiManagementService.updateCounters();
        },
        error: (err) => console.error('Error loading POIs:', err),
      })
    );
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

  showPoi(id: string) {
    this.router.navigate(['poi-management/anzeige', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
