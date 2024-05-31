import { Component } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Poi, Survey} from "../../../../core/models/partiBremen.model";
import {CounterState} from "../../../../shared/components/state-counter/state-counter.component";
import {SurveyManagementService} from "../../services/survey-management.service";
import {ApiService} from "../../../../core/Services/api.service";
import {environment} from "../../../../../environment";

@Component({
  selector: 'app-poi-surveys',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  private subscriptions: Subscription = new Subscription();
  private id: string | null = ''
  private currentPoiSubject = new BehaviorSubject<any>(null);
  protected title_surveyManagment: string = "Survey Management";

  constructor(
    protected surveyManagementService: SurveyManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
            if (this.id) {
                this.loadSurveys(this.id);
            } else {
                this.getAllSurveys();
                this.surveyManagementService.updateCounters();
            }
        });
    }

  searchTerm: string = '';

  get filteredItems() {
    return this.surveyManagementService.surveys.filter(item =>
      Object.values(item).some((value: any) =>
        value !== null &&
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  showSurvey(id: string) {
    this.router.navigate(['poi-management/survey-anzeige', id]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private async loadSurveys(id: string) {
    this.surveyManagementService.surveys = await this.getPoiSurveys(id)
    this.surveyManagementService.dataSource.data = this.surveyManagementService.surveys;
    this.surveyManagementService.updateCounters()
  }

  getAllSurveys() {
    this.subscriptions.add(
      this.surveyManagementService.getSurveys().subscribe({
        next: (surveys) => {
          this.surveyManagementService.surveys = surveys;
          this.surveyManagementService.dataSource.data = surveys;
          this.surveyManagementService.updateCounters();
        },
        error: (err) => console.error('Error loading POIs:', err),
      })
    );
  }

  async getPoiById(poiId: string): Promise<Poi> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.surveyManagementService.getPoiByID(poiId).subscribe({
          next: (poi) => {
            this.currentPoiSubject.next(poi);
            resolve(poi); // Return the poi object
          },
          error: (err) => {
            console.error('Error loading POI:', err);
            reject(err); // Reject the promise in case of an error
          },
        })
      );
    });
  }

  async getPoiSurveys(id: string) : Promise<Survey[]>{
    try {
      const poi = await this.getPoiById(id);
      console.log('Loaded POI:', poi); // Move this before the return statement
      return poi.surveys;
    } catch (error) {
      console.error('Failed to load POI:', error);
      return []; // Return an empty array in case of an error
    }
  }
}
