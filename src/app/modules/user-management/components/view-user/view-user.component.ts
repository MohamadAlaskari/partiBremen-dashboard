import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  ViewChild,
} from '@angular/core';
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

import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { HomeService } from '../../../home/services/home.service';
import { FormGroup, Validators } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss',
})
export class ViewUserComponent {
  @ViewChild('poiModal') poiModal!: ElementRef;
  @ViewChild('mapButton', { static: true })
  mapButton?: ElementRef<HTMLButtonElement>;
  title: string = 'Profile Details';
  id: string | null = null;
  user?: User;
  counters: CounterState[] = [];
  userPois: Poi[] = [];
  selectedPoi: Poi | null = null;
  poiClicked: boolean = false;
  private subscriptions: Subscription = new Subscription(); // To manage subscriptions
  dropdownOpen = false;
  selectedReportType: string = '';
  selectedReportItemId: any;
  currentUser: User | null = null;
  reportForm!: FormGroup;
  formBuilder: any;
  dropdownStates: Map<string, boolean> = new Map(); // Initialize dropdown states map



  constructor(
    private route: ActivatedRoute,
    private userService: UserManagementService,
    private toastService: ToastService,
    private authService: AuthService,
    private ngZone: NgZone, // Inject NgZone
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.extractIdFromRoute();
    });

    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      kommentar: ['', Validators.required],
    });
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
        this.ngZone.run(() => {
          this.selectedPoi = poi;
          poi.comments.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          console.log('selected poi:', this.selectedPoi);
          this.cdr.detectChanges(); // Trigger change detection
        });
      },
      error: () => {},
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
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toastService.show('error', 'Error', 'User not logged in');
      return;
    }

    const voting: Voting = {
      votedPoiId: poiId,
      voterId: currentUser.id,
      voteType: voteType,
    };

    const sub = this.userService.vote(voting).subscribe({
      next: () => {
        this.toastService.show('success', 'Success', 'Vote added successfully');
        this.loadUserPois(this.id!); // Reload POIs to update vote counts
        console.log('Vote added successfully');
      },
      error: (error) => {
        this.handleError('Error adding vote');
        console.log(error);
      },
    });
    this.subscriptions.add(sub);
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
      { count: this.userPois.length * 3 - 5, label: 'Credit' },
      { count: 65, label: 'Comments' },
    ];
  }

  getInitials(name: string, surname: string): string {
    return `${name.charAt(0).toUpperCase()}${surname.charAt(0).toUpperCase()}`;
  }

  selectPoi(poiId: string): void {
    this.loadPoiByPoiID(poiId);
    this.openModal();
  }

  onMarkerClick(poi: Poi): void {
    this.poiClicked = true;
    this.selectedPoi = poi;
    console.log('selected poi: ', this.selectedPoi);
    this.openModal();
  }

  private handleError(message: string): void {
    this.toastService.show('error', 'Error', message);
  }

  openModal(): void {
    const modalElement = this.poiModal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
}
