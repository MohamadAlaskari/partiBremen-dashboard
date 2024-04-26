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
  items: Poi[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private poiManagementService: PoiManagementService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadPois();
  }

  searchTerm: string = '';

  get filteredItems() {
    return this.items.filter(item =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  /**
  get fertig() {
    return this.items.filter(item =>
      item.status.includes("Fertig")
    ).length;
  }

  get wirdgebaut() {
    return this.items.filter(item =>
      item.status.includes("Wird gebaut")
    ).length;
  }

  get inplanung() {
    return this.items.filter(item =>
      item.status.includes("In Planung")
    ).length;
  }
    **/

  showPoi(poi: any) {
    this.poiManagementService.setPoi(poi)

  }

  loadPois(): void {
    this.subscriptions.add(
      this.poiManagementService.getPois().subscribe({
        next: (pois) => {
          this.items = pois;
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
}
