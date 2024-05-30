import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {Subscription} from "rxjs";
import {PoiManagementService} from "../../../poi-management/services/poi-management.service";
import {ToastService} from "../../../../shared/services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Survey} from "../../../../core/models/partiBremen.model";

@Component({
  selector: 'app-survey-anzeige',
  templateUrl: './survey-anzeige.component.html',
  styleUrl: './survey-anzeige.component.scss'
})
export class SurveyAnzeigeComponent {
  private subscriptions: Subscription = new Subscription();
  protected currentSurvey: any = null
  private id: string | null = ''

  constructor(
    protected poiManagementService: PoiManagementService,
    private toastService: ToastService,
    private router: Router,
    private route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadSurvey(this.id)
      }
    });
  }

  private loadSurvey(id : string) {
    this.poiManagementService.getSurveyById(id).subscribe(
      (survey : Survey) => {
        this.currentSurvey = survey;
      },
      (error) => {
        this.toastService.show('error', 'Error', 'Error loading Survey');
      }
    );
  }


  ngOnDestroy() {
    this.currentSurvey = null
    this.subscriptions.unsubscribe();
  }

  async updateSurvey(): Promise<void> {
    const survey = await this.poiManagementService.loadSurveyById(this.currentSurvey.id);
    const surveyId = survey?.id;

    console.log("POI ID:", surveyId);
    console.log("POI Data:", survey);

    if (!surveyId || !survey) {
      console.error('PoiId or Poi is missing, cannot update');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.updateSurvey(surveyId, survey).subscribe(() => {
          console.log("POI updated successfully");
        },
        error => {
          console.error('Could not update Survey', error);
        })
    );
  }

  deleteSurvey(): void {
    const surveyId = this.currentSurvey?.id;
    if (!surveyId) {
      console.error('Survey ID is missing, cannot delete');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.deleteSurvey(surveyId).subscribe({
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

  navigateToUser(id: string) {
    this.router.navigate(['view-user', id]);
  }

  navigateToPoi(id: string) {
    this.router.navigate(['anzeige', id]);
  }
}
