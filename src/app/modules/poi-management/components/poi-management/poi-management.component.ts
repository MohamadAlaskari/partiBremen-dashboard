import { Component } from '@angular/core';
import { PoiManagementService } from '../../services/poi-management.service';
import {ToastService} from "../../../../shared/services/toast.service";
import {Subscription} from "rxjs";
import {User} from "../../../../shared/models/user.model";
import {Poi} from "../../../../shared/models/poi.model";

@Component({
  selector: 'app-poi-management',
  templateUrl: './poi-management.component.html',
  styleUrl: './poi-management.component.scss'
})
export class PoiManagementComponent {
  pois: Poi[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private poiManagementService: PoiManagementService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadPois();
  }

  searchTerm: string = '';

  get filteredItems() {
    return this.pois.filter(item =>
      Object.values(item).some((value: any) =>
        value !== null &&
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }


  showPoi(poi: any) {
    this.poiManagementService.setPoi(poi)

  }

  loadPois(): void {
    this.subscriptions.add(
      this.poiManagementService.getPois().subscribe({
        next: (pois) => {
          this.pois = pois;
          this.toastService.show(
            'success',
            'Success',
            'Pois loaded successfully'
          );
        },
        error: (err) => {
          this.toastService.show('error', 'Error', 'Failed to load Pois');
        },
      })
    );
  }

  updatePoi(poiId: string, poi: Poi): void {
    this.subscriptions.add(
      this.poiManagementService.updatePoi(poiId, poi).subscribe({
        next: (updatedPoi) => {
          const index = this.pois.findIndex((u) => u.id === updatedPoi.id);
          this.pois[index] = updatedPoi;
          this.toastService.show(
            'success',
            'Success',
            `Poi updated successfully: ${updatedPoi.titel}`
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error updating poi: ${error.message}`
          );
        },
      })
    );
  }

  getActiveCount(): number {
    return this.pois.filter(item => item.active === true).length;
  }

  getInactiveCount(): number {
    return this.pois.filter(item => item.active === false).length;
  }
}
