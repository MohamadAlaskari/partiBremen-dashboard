// poi-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PoiManagementService } from '../../services/poi-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.scss']
})
export class PoiListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected title_poiManagment: string = 'POI Management';
  dropdownStates: boolean[] = [];

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
          pois.forEach(() => this.dropdownStates.push(false));
        },
        error: (err) => console.error('Error loading POIs:', err),
      })
    );
  }

  toggleDropdown(index: number): void {
    // Toggle only the dropdown of the specified index
    this.dropdownStates[index] = !this.dropdownStates[index];

    // Optional: Close all other dropdowns
    this.dropdownStates = this.dropdownStates.map((state, i) =>
      i === index ? state : false
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

  deletePoi(poiId : string): void {
    if (!poiId) {
      console.error('POI ID is missing, cannot delete');
      return;
    }
    this.subscriptions.add(
      this.poiManagementService.deletePoi(poiId).subscribe({
        next: () => {
          this.getPois();
          this.toastService.show(
            'success',
            'Success',
            'POI deleted successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error deleting POI: ${error.message}`
          );
        },
      })
    );
  }

  closeDropdown() {
    this.poiManagementService.pois.forEach(() => this.dropdownStates.push(false));
  }
}
