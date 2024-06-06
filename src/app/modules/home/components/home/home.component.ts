import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapboxService } from '../../../../shared/services/mapbox-service/mapbox.service';
import { Poi,User } from '../../../../core/models/partiBremen.model';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pois: Poi[] = [];
  poiClicked: boolean = false;
  formData!: FormGroup;
  currentUser: User | null = null;

  selectedPoi: Poi | null = null; // Initialize as null
  @ViewChild('poiModal') poiModal!: ElementRef;
    @ViewChild('mapButton', { static: true }) mapButton?: ElementRef<HTMLButtonElement>;
    constructor(
    private mapboxService: MapboxService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.loadPOIs();
    this.mapboxService.setOnMarkerClickCallback(this.onMarkerClick.bind(this));
    this.formData = this.formBuilder.group({
      titel: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }
  submitForm(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.formData && this.formData.valid) {
      console.log('Form data:', this.formData.value);

      // Ensure this.currentUser?.id is defined before using it
      const creatorId = this.currentUser?.id || '';

      this.homeService.createPoi(
        this.formData.get('titel')?.value,
        this.formData.get('description')?.value,
        creatorId,
        this.formData.get('latitude')?.value,
        this.formData.get('longitude')?.value,
      ).subscribe({
        next: (response) => {
            // Handle the response if needed
            console.log("POI created:", response);
        },
        error: (error) => {
            // Handle any errors
            console.error("Error creating POI:", error);
        }
      });
    }
}




  ngAfterViewInit(): void {
    if (this.mapButton) {
      this.mapButton.nativeElement.addEventListener('click', () => {
        this.changeCursorToPenIcon();
      });
    }

    this.setupMapClickHandler();
  }

  private changeCursorToPenIcon(): void {
    if (this.mapButton) {
      this.mapButton.nativeElement.style.cursor = 'url("https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-red-location-map-icon-png-image_5237524.png"), auto';
    }
  }

  private setupMapClickHandler(): void {
    this.mapboxService.setOnMapClickCallback((coordinates) => {
      console.log('Clicked coordinates:', coordinates); //
      this.formData.patchValue({ latitude: coordinates.latitude });
      this.formData.patchValue({ longitude: coordinates.longitude });

      this.resetCursorToDefault();
    });
  }

  private resetCursorToDefault(): void {
    if (this.mapButton) {
      this.mapButton.nativeElement.style.cursor = 'auto';
    }
  }
  ngOnDestroy(): void {
    this.mapboxService.map?.remove();
  }

  private loadPOIs() {
    this.homeService.getPOIs().subscribe({
      next: (response) => {
        this.pois = response;
        this.initializeMap();
      },
      error: (error) => {},
    });
  }

  private initializeMap(): void {
    this.mapboxService.initializeMap('map', [8.8016936, 53.0792962], 9);
    this.mapboxService.map.on('load', () => {
      this.mapboxService.addMarkers(this.pois);
    });
  }

  private onMarkerClick(poi: Poi): void {
    this.poiClicked = true;
    console.log(this.poiClicked);
    this.selectedPoi = poi;
    this.openModal();
  }
  openModal(): void {
    const modalElement = this.poiModal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
  addComment(poiId: string, commentText: string): void {}

  vote(poiId: string, voteType: string): void {}

  getVoteCount(poiId: string, voteType: string): number {
    const poi = this.pois.find((p) => p.id === poiId);
    if (poi) {
      return poi.votings.filter((v) => v.voteType === voteType).length;
    }
    return 0;
  }

  getInitials(name: string, surname: string): string {
    const fname = name.charAt(0).toUpperCase();
    const fsurname = surname.charAt(0).toUpperCase();
    return fname + fsurname;
  }

  trackById(index: number, poi: Poi): string {
    return poi.id;
  }
}
