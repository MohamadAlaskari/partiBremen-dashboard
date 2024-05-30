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

  showPoi(id: string) {
    this.router.navigate(['poi-management/anzeige', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
