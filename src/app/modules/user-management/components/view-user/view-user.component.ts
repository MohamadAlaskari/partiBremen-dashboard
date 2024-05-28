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

import { MapboxService } from '../../../../shared/services/mapbox-service/mapbox.service';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { AuthService } from '../../../auth/services/auth.service';

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
  selectedPoi: Poi | null = null; // Initialize as null
  comment!: Comment;

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService,
    private mapboxService: MapboxService,
    private authService: AuthService
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
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error) => {
        this.toastService.show('error', 'Error', 'Error loading user');
      },
    });
  }

  private loadUserPois(userId: string): void {
    this.userService.getPoisByUserId(userId).subscribe({
      next: (userPois: Poi[]) => {
        this.userPois = userPois;
        this.updateCounters();
        this.initializeMap();
      },
      error: (error) => {
        console.log('Error loading user POIs: ', error);
        this.toastService.show('error', 'Error', 'Error loading user POIs');
      },
    });
  }

  private loadPoiByPoiID(poiId: string): void {
    this.userService.getPoibyId(poiId).subscribe({
      next: (poi: Poi) => {
        this.selectedPoi = poi;
        console.log('selected poi:', this.selectedPoi);
      },
      error: (error) => {
        console.log('Error loading POI: ', error);
      },
    });
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

    this.userService
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
        error: (error) => {
          this.toastService.show('error', 'Error', 'Error adding comment');
        },
      });
  }

  vote(poiId: string, voteType: string): void {}

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
    const fname = name.charAt(0).toUpperCase();
    const fsurname = surname.charAt(0).toUpperCase();
    return fname + fsurname;
  }

  trackById(index: number, poi: Poi): string {
    return poi.id;
  }

  selectPoi(poiId: string) {
    this.loadPoiByPoiID(poiId);
  }
}
