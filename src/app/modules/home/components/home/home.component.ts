import {
  ChangeDetectorRef,
  Component,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MapboxService } from '../../../../shared/services/mapbox-service/mapbox.service';
import { Poi, User, Comment } from '../../../../core/models/partiBremen.model';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';

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
  private subscriptions: Subscription = new Subscription();
  reportForm!: FormGroup;
  currentUser: User | null = null;
  selectedReportType: string = '';
  selectedReportItemId: any;
  pageTitle: string = 'Home';
  dropdownOpen = false;
  dropdowncommentOpen = false;
  title: string = '';
  selectedPoi: Poi | null = null;
  @ViewChild('poiModal') poiModal!: ElementRef;
  @ViewChild('mapButton', { static: true })
  mapButton?: ElementRef<HTMLButtonElement>;
  currentStep: number = 1;
  dropdownStates: Map<string, boolean> = new Map();
  lastOpenedCommentId: string | null = null;
  mapCursorEnabled: boolean = false;

  constructor(
    private mapboxService: MapboxService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private userService: UserManagementService
  ) {}

  ngOnInit() {
    this.loadPOIs();
    this.mapboxService.setOnMarkerClickCallback(this.onMarkerClick.bind(this));
    this.formData = this.formBuilder.group({
      titel: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      kommentar: ['', Validators.required],
    });
  }

  goToNextStep(): void {
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }

  toggleDropdowncomment(comment: Comment): void {
    const commentId = comment.id;
    if (commentId) {
      if (this.lastOpenedCommentId && this.lastOpenedCommentId !== commentId) {
        this.dropdownStates.set(this.lastOpenedCommentId, false);
      }
      const currentState = this.dropdownStates.get(commentId) || false;
      this.dropdownStates.set(commentId, !currentState);
      this.lastOpenedCommentId = commentId;
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdownIfNotClickedInside(event: MouseEvent): void {
    let clickedInsideDropdown = false;

    document.querySelectorAll('.dropdown').forEach((element) => {
      if (element.contains(event.target as Node)) {
        clickedInsideDropdown = true;
      }
    });

    if (!clickedInsideDropdown) {
      this.dropdownStates.forEach((value, key) => {
        if (value) {
          this.dropdownStates.set(key, false);
        }
      });
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!event.target || !(event.target as HTMLElement).closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }

  selectReport(type: string, id: any, title: string) {
    this.selectedReportType = type;
    this.selectedReportItemId = id;
    this.title = title;
  }

  selectPoi(poiId: string): void {
    this.loadPoiByPoiID(poiId);
    this.openModal();
  }

  private loadPoiByPoiID(poiId: string): void {
    const sub = this.userService.getPoibyId(poiId).subscribe({
      next: (poi: Poi) => {
        this.selectedPoi = poi;
        poi.comments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.cdr.detectChanges();
      },
      error: () => {},
    });
    this.subscriptions.add(sub);
  }

  Submitreport() {
    this.currentUser = this.authService.getCurrentUser();
    const creatorId = this.currentUser?.id || '';
    if (this.reportForm.valid) {
      const reportData = {
        title: this.reportForm.get('title')?.value,
        kommentar: this.reportForm.get('kommentar')?.value,
        creatorId: creatorId,
        itemId: this.selectedReportItemId,
      };

      let reportObservable;

      switch (this.selectedReportType) {
        case 'poi':
          reportObservable = this.homeService.createpoireport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
        case 'user':
          reportObservable = this.homeService.createuserreport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
        case 'comment':
        default:
          reportObservable = this.homeService.createcommentreport(
            reportData.title,
            reportData.kommentar,
            reportData.creatorId,
            reportData.itemId
          );
          break;
      }

      reportObservable.subscribe({
        next: (response) => {
          console.log(`${this.selectedReportType} report created:`, response);
          window.location.reload();
        },
        error: (error) => {
          console.error(
            `Error creating ${this.selectedReportType} report:`,
            error
          );
        },
      });
    }
  }

  closeForm() {
    this.selectedReportType = '';
    this.selectedReportItemId = null;
  }

  toggleMapCursor(): void {
    this.mapCursorEnabled = !this.mapCursorEnabled;
  }

  submitForm(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.formData && this.formData.valid) {
      console.log('Form data:', this.formData.value);

      const creatorId = this.currentUser?.id || '';

      this.homeService
        .createPoi(
          this.formData.get('titel')?.value,
          this.formData.get('description')?.value,
          creatorId,
          this.formData.get('latitude')?.value,
          this.formData.get('longitude')?.value
        )
        .subscribe({
          next: (response) => {
            console.log('POI created:', response);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error creating POI:', error);
          },
        });
    }
  }

  ngAfterViewInit(): void {
    if (this.mapButton) {
      this.mapButton.nativeElement.addEventListener('click', () => {});
    }

    this.setupMapClickHandler();
  }

  private setupMapClickHandler(): void {
    this.mapboxService.setOnMapClickCallback((coordinates) => {
      console.log('Clicked coordinates:', coordinates);
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
    // this.mapboxService.map?.remove();
  }

  private loadPOIs() {
    this.homeService.getPOIs().subscribe({
      next: (response) => {
        this.pois = response;
      },
      error: (error) => {},
    });
  }

  onMarkerClick(poi: Poi): void {
    this.poiClicked = true;
    this.selectedPoi = poi;
    this.openModal();
  }

  openModal(): void {
    const modalElement = this.poiModal.nativeElement;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

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
          const poi = this.pois.find((p) => p.id === poiId);
          if (poi) {
            poi.comments.push(createdComment);
            poi.comments.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            if (this.selectedPoi?.id === poiId) {
              this.selectedPoi = { ...poi };
              this.cdr.detectChanges();
            }
          }
          commentInput.value = '';
          this.toastService.show(
            'success',
            'Success',
            'Comment added successfully'
          );
        },
        error: () => {},
      });
    this.subscriptions.add(sub);
  }

  trackByCommentId(index: number, comment: any): number {
    return comment.id;
  }
}
