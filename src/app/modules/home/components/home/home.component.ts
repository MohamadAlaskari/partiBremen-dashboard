import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapboxService } from '../../../../shared/services/mapbox-service/mapbox.service';
import { Poi } from '../../../../core/models/partiBremen.model';
import { HomeService } from '../../services/home.service';
declare var bootstrap: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pois: Poi[] = [];
  poiClicked: boolean = false;
  selectedPoi: Poi | null = null; // Initialize as null
  @ViewChild('poiModal') poiModal!: ElementRef;


  constructor(
    private mapboxService: MapboxService,
    private homeService: HomeService
  ) {}
  ngOnInit() {
    this.loadPOIs();
    this.mapboxService.setOnMarkerClickCallback(this.onMarkerClick.bind(this));
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
