import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MapboxService } from '../../services/mapbox-service/mapbox.service';
import { Poi } from '../../../core/models/partiBremen.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  @Input() pois: Poi[] = [];
  @Input() height: number = 280; // Default height
  @Output() selectedPoi = new EventEmitter<Poi>();

  constructor(private mapboxService: MapboxService) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height'] && !changes['height'].firstChange) {
      this.adjustMapHeight();
    }
    if (changes['pois'] && !changes['pois'].firstChange) {
      this.addMarkersToMap();
    }
  }

  ngOnDestroy(): void {
    this.mapboxService.map?.remove();
  }

  private initializeMap(): void {
    this.mapboxService.initializeMap('map', [8.8016936, 53.0792962], 9);
    this.mapboxService.map.on('load', () => {
      this.addMarkersToMap();
      this.adjustMapHeight(); // Ensure height is adjusted when the map is fully loaded
    });
    this.mapboxService.setOnMarkerClickCallback(this.onMarkerClick.bind(this));
  }

  private addMarkersToMap(): void {
    if (this.mapboxService.map && this.mapboxService.map.loaded()) {
      this.mapboxService.addMarkers(this.pois);
    } else {
      this.mapboxService.map?.on('load', () => {
        this.mapboxService.addMarkers(this.pois);
      });
    }
  }

  private onMarkerClick(poi: Poi): void {
    this.selectedPoi.emit(poi);
  }

  private adjustMapHeight(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.style.height = `${this.height}px`;
      if (this.mapboxService.map && this.mapboxService.map.loaded()) {
        this.mapboxService.map.resize();
      } else {
        this.mapboxService.map?.on('load', () => {
          this.mapboxService.map.resize();
        });
      }
    }
  }
}
