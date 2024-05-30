import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { PoiManagementService } from "../../services/poi-management.service";
import { Subscription } from "rxjs";
import { ToastService } from "../../../../shared/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapboxService} from "../../../../shared/services/mapbox-service/mapbox.service";
import {Poi} from "../../../../core/models/partiBremen.model";

@Component({
  selector: 'app-poi-anzeige',
  templateUrl: './poi-anzeige.component.html',
  styleUrls: ['./poi-anzeige.component.scss']
})
export class PoiAnzeigeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected currentPoi: any = null
  private id: string | null = ''

  constructor(
    protected poiManagementService: PoiManagementService,
    @Inject(PLATFORM_ID) private platformId: any,
    private toastService: ToastService,
    private router: Router,
    private route : ActivatedRoute,
    private mapboxService : MapboxService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadPoi(this.id)
        this.waitForCurrentPoi()
      }
    });
  }

  private initializeMap(poi: Poi): void {
    this.mapboxService.initializeMap('map', [8.8016936, 53.0792962], 9);
    this.mapboxService.map.on('load', () => {
      this.mapboxService.addMarkers([poi]);
    });
  }

  waitForCurrentPoi(): Promise<void> {
    return new Promise((resolve) => {
      const checkPoi = () => {
        if (this.currentPoi !== null) {
          this.initializeMap(this.currentPoi)
        } else {
          setTimeout(checkPoi, 100); // prüft alle 100ms
        }
      };
      checkPoi();
    });
  }

  private loadPoi(id : string) {
      this.poiManagementService.getPoiByID(id).subscribe(
        (poi: Poi) => {
          this.currentPoi = poi;
        },
        (error) => {
          this.toastService.show('error', 'Error', 'Error loading Poi');
        }
      );
  }


  ngOnDestroy() {
    this.currentPoi = null
    this.subscriptions.unsubscribe();
  }

  async updatePoi(): Promise<void> {
    const poi = await this.poiManagementService.loadPoiById(this.currentPoi.id);
    const poiId = poi?.id;

    console.log("POI ID:", poiId);
    console.log("POI Data:", poi);

    if (!poiId || !poi) {
      console.error('PoiId or Poi is missing, cannot update');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.updatePoi(poiId, poi).subscribe(() => {
          console.log("POI updated successfully");
        },
        error => {
          console.error('Could not update POI', error);
        })
    );
  }

  deletePoi(): void {
    const poiId = this.currentPoi?.id;
    if (!poiId) {
      console.error('POI ID is missing, cannot delete');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.deletePoi(poiId).subscribe({
        next: () => {
          this.poiManagementService.loadPois();
          this.currentPoi = null;
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

  navigateToUser(id: string) {
    this.router.navigate(['view-user', id]);
  }

  navigateToComments() {
    this.router.navigate(['comments', this.poiManagementService.getComments(this.currentPoi.id)]);
  }

  navigateToSurveys() {
    this.router.navigate(['poi-management/surveys', this.currentPoi.id]);
  }

  navigateToReports() {
    this.router.navigate(['reports', this.currentPoi.id]);
  }
}
