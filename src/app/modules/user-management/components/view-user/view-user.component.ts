import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import {
  User,
  Poi,
  Comment,
  Voting,
  Report,
  Survey,
} from '../../../../core/models/partiBremen.model';
import * as mapboxgl from 'mapbox-gl'; // Korrekt importieren
import { environment } from '../../../../../environment';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  title: string = 'View User';
  id: string | null = null;
  user!: User;
  userPois: Poi[] = [];
  selectedPoi: Poi | null = null;

  map!: mapboxgl.Map;
  markers: { [key: string]: mapboxgl.Marker } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.extractIdFromRoute();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private extractIdFromRoute(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
        this.loadUserPois(this.id);
      }
    });
  }

  private loadUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        this.toastService.show('error', 'Error', 'Error loading user');
      }
    );
  }

  private loadUserPois(userId: string): void {
    this.userService.getPoisByUserId(userId).subscribe({
      next: (userPois: Poi[]) => {
        this.userPois = userPois;
        this.initializeMap(); // Map initialisieren, nachdem die POIs geladen wurden
      },
      error: (error) => {
        console.log('Error loading user POIs: ', error);
        this.toastService.show('error', 'Error', 'Error loading user POIs');
      },
    });
  }

  // mapbox
  private initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [8.8016936, 53.0792962],
      zoom: 9,
    });

    // Add navigation control (zoom and rotation controls)
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add full screen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add custom 3D toggle control
    const toggle3DControl = this.create3DToggleControl();
    this.map.addControl(toggle3DControl);

    this.map.on('load', () => {
      this.addMarkersToMap();
    });
  }

  private addMarkersToMap(): void {
    this.userPois.forEach((poi) => {
      const color = poi.active ? '#5ee560' : '#e55e5e';
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = color;
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([poi.longitude, poi.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<b>${poi.titel}</b><br>${poi.description}`
          )
        )
        .addTo(this.map);

      this.markers[poi.id] = marker;
    });
  }

  private create3DToggleControl() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'mapboxgl-ctrl';

    const button = document.createElement('button');
    button.textContent = 'Toggle 3D';
    button.onclick = () => this.toggle3DMode();
    controlDiv.appendChild(button);

    return {
      onAdd: () => controlDiv,
      onRemove: () => controlDiv.parentNode?.removeChild(controlDiv),
    };
  }

  private toggle3DMode(): void {
    const layerId = '3d-buildings';

    if (this.map.getLayer(layerId)) {
      // Schalte die Sichtbarkeit der 3D-Gebäude-Schicht um
      const visibility = this.map.getLayoutProperty(layerId, 'visibility');
      this.map.setLayoutProperty(
        layerId,
        'visibility',
        visibility === 'visible' ? 'none' : 'visible'
      );
      console.log('3D visibility toggled:', visibility);
    } else {
      // Füge die Quelle nur hinzu, wenn sie nicht bereits vorhanden ist
      if (!this.map.getSource('composite')) {
        this.map.addSource('composite', {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        });
      }
      // Füge die 3D-Gebäude-Schicht hinzu
      this.map.addLayer({
        id: layerId,
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
        layout: {
          visibility: 'visible',
        },
      });
      console.log('3D buildings layer added');
    }
  }

  private toggleAccordion(poiId: string): void {
    const element = document.getElementById(`heading${poiId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      const button = element.querySelector('.accordion-button') as HTMLElement;
      if (button) {
        button.click();
      }
    }
  }

  addComment(poiId: string, commentText: string): void {
    const newComment = new Comment(
      (Math.random() * 1000).toString(),
      new Date().toISOString(),
      new Date().toISOString(),
      '',
      this.user,
      poiId,
      [],
      [],
      [],
      commentText
    );
    const poi = this.userPois.find((p) => p.id === poiId);
    if (poi) {
      poi.comments.push(newComment);
    }
  }

  vote(poiId: string, voteType: string): void {
    const newVote = new Voting(
      (Math.random() * 1000).toString(),
      new Date().toISOString(),
      new Date().toISOString(),
      voteType,
      null, // Adjust here if necessary
      null, // Adjust here if necessary
      poiId,
      this.user
    );
    const poi = this.userPois.find((p) => p.id === poiId);
    if (poi) {
      poi.votings.push(newVote);
    }
  }

  getVoteCount(poiId: string, voteType: string): number {
    const poi = this.userPois.find((p) => p.id === poiId);
    if (poi) {
      return poi.votings.filter((v) => v.voteType === voteType).length;
    }
    return 0;
  }

  countUserPois(): number {
    return this.userPois.length;
  }
}
