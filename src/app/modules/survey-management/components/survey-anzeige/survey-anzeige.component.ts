import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../../../../core/models/partiBremen.model';
import { SurveyManagementService } from '../../services/survey-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey-anzeige',
  templateUrl: './survey-anzeige.component.html',
  styleUrl: './survey-anzeige.component.scss',
})
export class SurveyAnzeigeComponent {
  private subscriptions: Subscription = new Subscription();
  private currentSurveySubject = new BehaviorSubject<any>(null);
  protected currentSurvey: any = null;
  private id: string | null = '';
  surveyForm!: FormGroup;

  constructor(
    protected surveyManagementService: SurveyManagementService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadSurvey(this.id);
      }
    });
  }

  private loadSurvey(id: string) {
    this.surveyManagementService.getSurveyById(id).subscribe(
      (survey: Survey) => {
        this.currentSurvey = survey;
      },
      (error) => {
        this.toastService.show('error', 'Error', 'Error loading Survey');
      }
    );
  }

  ngOnDestroy() {
    this.currentSurvey = null;
    this.subscriptions.unsubscribe();
  }

  private initForm(): void {

    this.surveyForm = new FormGroup({
      titel: new FormControl(this.currentSurvey.titel, Validators.required),
      description: new FormControl(this.currentSurvey.description, Validators.required),
      active: new FormControl(this.currentSurvey.active, Validators.required),
      creatorId: new FormControl(this.currentSurvey.creator.id, Validators.required),
      latitude: new FormControl(this.currentSurvey.latitude, Validators.required),
      longitude: new FormControl(this.currentSurvey.longitude, Validators.required),
      img: new FormControl(this.currentSurvey.img),
    });

  }

  updatePoi(): void {
    this.initForm();
    if (this.surveyForm.valid) {
      const updatedSurvey = { ...this.currentSurvey, ...this.surveyForm.value };
      // Log the data being sent
      this.subscriptions.add(
        this.surveyManagementService
          .updateSurvey(this.currentSurvey.id, updatedSurvey)
          .subscribe({
            next: () => {
              this.toastService.show(
                'success',
                'Success',
                'POI updated successfully'
              );
              setTimeout(() => {
                this.router.navigate(['/poi-management']);
              }, 500);
            },
            error: (error) => {
              this.toastService.show(
                'error',
                'Error',
                'Failed to update POI. Please try again later'
              );
            },
          })
      );
    }
  }

  async updateSurvey(): Promise<void> {
    const survey = await this.getSurveyById(this.currentSurvey.id);
    const surveyId = survey?.id;

    console.log('POI ID:', surveyId);
    console.log('POI Data:', survey);

    if (!surveyId || !survey) {
      console.error('PoiId or Poi is missing, cannot update');
      return;
    }

    this.subscriptions.add(
      this.surveyManagementService.updateSurvey(surveyId, survey).subscribe(
        () => {
          console.log('POI updated successfully');
        },
        (error) => {
          console.error('Could not update Survey', error);
        }
      )
    );
  }

  deleteSurvey(): void {
    const surveyId = this.currentSurvey?.id;
    if (!surveyId) {
      console.error('Survey ID is missing, cannot delete');
      return;
    }

    this.subscriptions.add(
      this.surveyManagementService.deleteSurvey(surveyId).subscribe({
        next: () => {
          this.currentSurvey = null;
          this.toastService.show(
            'success',
            'Success',
            'POI deleted successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error deleting POI: ${error.message}`
          );
        },
      })
    );
  }

  async getSurveyById(surveyId: string): Promise<Survey> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.surveyManagementService.getSurveyById(surveyId).subscribe({
          next: (survey) => {
            this.currentSurveySubject.next(survey);
            resolve(survey); // Return the poi object
          },
          error: (err) => {
            console.error('Error loading Survey:', err);
            reject(err); // Reject the promise in case of an error
          },
        })
      );
    });
  }

  navigateToUser(id: string) {
    this.router.navigate(['view-user', id]);
  }

  navigateToPoi(id: string) {
    this.router.navigate(['anzeige', id]);
  }
}
