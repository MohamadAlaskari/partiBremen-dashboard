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
import { MapboxService } from '../../services/mapbox-service/mapbox.service';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  title: string = 'View User';
  id: string | null = null;
  user!: User;
  counters: CounterState[] = [];
  userPois: Poi[] = [];
  selectedPoi: Poi | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService,
    private mapboxService: MapboxService // Hinzufügen des Mapbox-Services
  ) {}

  ngOnInit(): void {
    this.extractIdFromRoute();
  }

  ngOnDestroy(): void {
    this.mapboxService.map?.remove();
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
        this.updateCounters();
        this.initializeMap(); // Map initialisieren, nachdem die POIs geladen wurden
      },
      error: (error) => {
        console.log('Error loading user POIs: ', error);
        this.toastService.show('error', 'Error', 'Error loading user POIs');
      },
    });
  }

  private initializeMap(): void {
    this.mapboxService.initializeMap('map', [8.8016936, 53.0792962], 9);
    this.mapboxService.map.on('load', () => {
      this.mapboxService.addMarkers(this.userPois);
    });
  }

  private toggle3DMode(): void {
    this.mapboxService.toggle3DMode();
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
      null, // Adjust hier if necessary
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

  updateCounters(): void {
    this.counters = [
      { count: this.userPois.length, label: 'POIs' },
      { count: 20, label: 'Credit' },
      { count: 100, label: 'Comments' },
    ];
  }

  getInitials(name: string, surname: string): string {
    const names = name.split(' ');
    const surnames = surname.split(' ');

    const fname = names.map((n) => n.charAt(0).toUpperCase()).join('');
    const fsurname = surnames.map((n) => n.charAt(0).toUpperCase()).join('');

    return fname + fsurname;
  }
}
