import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { User } from '../../../../shared/models/user.model';
import * as L from 'leaflet';
import {
  Poi,
  Comment,
  Voting,
  Report,
  Survey,
} from '../../../../core/models/partiBremen.model';
import { loadLeaflet } from '../../../../utils/leaflet-browser';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  title: string = 'View User';
  id: string | null = null;
  user!: User;
  pois: Poi[] = [];
  selectedPoi: Poi | null = null;
  map: L.Map | null = null;
  markers: { [key: string]: L.Marker } = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.extractIdFromRoute();
  }

  private extractIdFromRoute(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
        this.loadPois();
      }
    });
  }

  private loadUser(id: string): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.user = user;
    });
  }

  private async loadPois(): Promise<void> {
    this.userService.getPois().subscribe(async (pois: Poi[]) => {
      this.pois = pois.filter((poi) => poi.creator.id === this.user.id);
      await this.initializeMap();
    });
  }
  private loadUserPois(){}

  private async initializeMap(): Promise<void> {
    if (this.map) {
      this.map.remove();
    }

    const L = await loadLeaflet();

    this.map = L.map('map').setView([53.0792962, 8.8016936], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    const defaultIcon = L.icon({
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    this.pois.forEach((poi) => {
      if (this.map) {
        const marker = L.marker([poi.latitude, poi.longitude], {
          icon: defaultIcon,
        })
          .addTo(this.map)
          .bindPopup(`<b>${poi.titel}</b><br>${poi.description}`)
          .on('click', () => {
            this.selectedPoi = poi;
            this.toggleAccordion(poi.id);
          });
        this.markers[poi.id] = marker;
      }
    });
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
    const poi = this.pois.find((p) => p.id === poiId);
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
    const poi = this.pois.find((p) => p.id === poiId);
    if (poi) {
      poi.votings.push(newVote);
    }
  }

  getVoteCount(poiId: string, voteType: string): number {
    const poi = this.pois.find((p) => p.id === poiId);
    if (poi) {
      return poi.votings.filter((v) => v.voteType === voteType).length;
    }
    return 0;
  }
}
