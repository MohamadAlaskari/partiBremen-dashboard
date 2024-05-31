import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { PoiManagementService } from "../../services/poi-management.service";
import {BehaviorSubject, Subscription} from "rxjs";
import { ToastService } from "../../../../shared/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MapboxService} from "../../../../shared/services/mapbox-service/mapbox.service";
import {Poi} from "../../../../core/models/partiBremen.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-poi-anzeige',
  templateUrl: './poi-anzeige.component.html',
  styleUrls: ['./poi-anzeige.component.scss']
})
export class PoiAnzeigeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  protected currentPoi: any = null
  private id: string | null = ''
  private currentPoiSubject = new BehaviorSubject<any>(null);
  poiForm!: FormGroup;

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

  private initForm(): void {
    this.poiForm = new FormGroup({
      titel: new FormControl(this.currentPoi.titel, Validators.required),
      description: new FormControl(this.currentPoi.description, Validators.required),
      active: new FormControl(this.currentPoi.active, Validators.required),
      creatorId: new FormControl(this.currentPoi.creator.id, Validators.required),
      latitude: new FormControl(this.currentPoi.latitude, Validators.required),
      longitude: new FormControl(this.currentPoi.longitude, Validators.required),
      img: new FormControl(this.currentPoi.img),
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

  updatePoi(): void {
    this.initForm()
    if (this.poiForm.valid) {
      const updatedPoi = { ...this.currentPoi, ...this.poiForm.value};
      // Log the data being sent
      this.subscriptions.add(
        this.poiManagementService.updatePoi(this.currentPoi.id, updatedPoi).subscribe({
          next: () => {
            this.toastService.show(
              'success',
              'Success',
              'POI updated successfully'
            );
            setTimeout(() => {
              this.router.navigate(['/poi-management']);
            }, 500);
          },
          error: (error) => {
            this.toastService.show(
              'error',
              'Error',
              'Failed to update POI. Please try again later'
            );
          },
        })
      );
    }
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
          this.poiManagementService.getPois();
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

  async getPoiById(poiId: string): Promise<Poi> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.poiManagementService.getPoiByID(poiId).subscribe({
          next: (poi) => {
            this.currentPoiSubject.next(poi);
            resolve(poi); // Return the poi object
          },
          error: (err) => {
            console.error('Error loading POI:', err);
            reject(err); // Reject the promise in case of an error
          },
        })
      );
    });
  }
}
