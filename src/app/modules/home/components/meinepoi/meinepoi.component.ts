import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Poi, User ,Comment } from '../../../../core/models/partiBremen.model';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';

@Component({
  selector: 'app-meinepoi',
  templateUrl: './meinepoi.component.html',
  styleUrl: './meinepoi.component.scss'
})
export class MeinepoiComponent {
  title: string = 'View User';
  id: string | null = null;
  user: User | null = null;
  counters: CounterState[] = [];
  userPois: Poi[] = [];
  selectedPoi: Poi | null = null;
  poiClicked: boolean = false;
  private subscriptions: Subscription = new Subscription(); // To manage subscriptions

  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService,
    private authService: AuthService,
    private ngZone: NgZone, // Inject NgZone
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.loadUser(this.user.id);
      this.loadUserPois(this.user.id);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }

  private extractIdFromRoute(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadUser(this.id);
        this.loadUserPois(this.id);
      }
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
        poi.comments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        console.log('selected poi:', this.selectedPoi);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: () => {
        this.handleError('Error loading POI');
      },
    });
    this.subscriptions.add(sub);
  }

  addComment(
    poiId: string,
    commentText: string,
    commentInput: HTMLInputElement
  ): void {
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
            poi.comments.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            console.log('comments: ', poi.comments);
            if (this.selectedPoi?.id === poiId) {
              this.selectedPoi = { ...poi };
              this.cdr.detectChanges(); // Trigger change detection
            }
          }
          commentInput.value = ''; // Clear the input field
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

  onMarkerClick(poi: Poi): void {
    this.poiClicked = true;
    this.selectedPoi = poi;
    console.log('selected poi: ', this.selectedPoi);
  }

  private handleError(message: string): void {
    this.toastService.show('error', 'Error', message);
  }
}
