import { Component, NgZone } from '@angular/core';
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

import { MapboxService } from '../../../../shared/services/mapbox-service/mapbox.service';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  title: string = 'View User';
  id: string | null = null;
  user?: User;
  counters: CounterState[] = [];
  userPois: Poi[] = [];
  selectedPoi: Poi | null = null;
  poiClicked: boolean = false;
  private subscriptions: Subscription = new Subscription(); // To manage subscriptions

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService,
    private mapboxService: MapboxService,
    private authService: AuthService,
    private ngZone: NgZone // Inject NgZone
  ) {}

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.extractIdFromRoute();
    });
  }

  ngOnDestroy(): void {
    this.mapboxService.map?.remove();
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }

  private extractIdFromRoute(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
        this.loadUserPois(this.id);
      }
      this.mapboxService.setOnMarkerClickCallback(
        this.onMarkerClick.bind(this)
      );
    });
    this.subscriptions.add(sub);
  }

  private loadUser(id: string): void {
    const sub = this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: () => {
        this.handleError('Error loading user');
      },
    });
    this.subscriptions.add(sub);
  }

  private loadUserPois(userId: string): void {
    const sub = this.userService.getPoisByUserId(userId).subscribe({
      next: (userPois: Poi[]) => {
        this.userPois = userPois;
        this.updateCounters();
        this.initializeMap();
      },
      error: () => {
        this.handleError('Error loading user POIs');
      },
    });
    this.subscriptions.add(sub);
  }

  private loadPoiByPoiID(poiId: string): void {
    const sub = this.userService.getPoibyId(poiId).subscribe({
      next: (poi: Poi) => {
        this.selectedPoi = poi;
        console.log('selected poi:', this.selectedPoi);
      },
      error: () => {
        this.handleError('Error loading POI');
      },
    });
    this.subscriptions.add(sub);
  }

  private initializeMap(): void {
    this.mapboxService.initializeMap('map', [8.8016936, 53.0792962], 9);
    this.mapboxService.map.on('load', () => {
      this.mapboxService.addMarkers(this.userPois);
    });
  }

  addComment(poiId: string, commentText: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toastService.show('error', 'Error', 'User not logged in');
      return;
    }

    const sub = this.userService
      .createComment(commentText, currentUser.id, poiId)
      .subscribe({
        next: (createdComment: Comment) => {
          const poi = this.userPois.find((p) => p.id === poiId);
          if (poi) {
            poi.comments.push(createdComment);
          }
          this.toastService.show(
            'success',
            'Success',
            'Comment added successfully'
          );
        },
        error: () => {
          this.handleError('Error adding comment');
        },
      });
    this.subscriptions.add(sub);
  }

  vote(poiId: string, voteType: string): void {
    // Implement voting logic here
  }

  getVoteCount(poiId: string, voteType: string): number {
    const poi = this.userPois.find((p) => p.id === poiId);
    if (poi) {
      return poi.votings.filter((v) => v.voteType === voteType).length;
    }
    return 0;
  }

  updateCounters(): void {
    this.counters = [
      { count: this.userPois.length, label: 'POIs' },
      { count: 20, label: 'Credit' },
      { count: 100, label: 'Comments' },
    ];
  }

  getInitials(name: string, surname: string): string {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  }

  trackById(index: number, poi: Poi): string {
    return poi.id;
  }

  selectPoi(poiId: string): void {
    this.loadPoiByPoiID(poiId);
  }

  private onMarkerClick(poi: Poi): void {
    this.poiClicked = true;
    this.selectedPoi = poi;
    console.log('selected poi: ', this.selectedPoi);
  }

  private handleError(message: string): void {
    this.toastService.show('error', 'Error', message);
  }
}
