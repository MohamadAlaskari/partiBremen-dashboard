import { Component } from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {Poi, Survey} from "../../../../core/models/partiBremen.model";
import {CounterState} from "../../../../shared/components/state-counter/state-counter.component";
import {SurveyManagementService} from "../../services/survey-management.service";
import {ApiService} from "../../../../core/Services/api.service";
import {environment} from "../../../../../environment";
import {ToastService} from "../../../../shared/services/toast.service";

@Component({
  selector: 'app-poi-surveys',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  private subscriptions: Subscription = new Subscription();
  private id: string | null = null
  private currentPoiSubject = new BehaviorSubject<any>(null);
  protected title_surveyManagment: string = "Survey Management";
  dropdownStates: boolean[] = [];

  constructor(
    protected surveyManagementService: SurveyManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
       this.id = params.get('id');
       this.setTabelle()
    });
  }

  private setTabelle() {
    if (this.id) {
      this.loadSurveys(this.id);
    } else {
      this.getAllSurveys();
      this.surveyManagementService.updateCounters();
    }
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

  deleteSurvey(surveyId : string): void {
    if (!surveyId) {
      console.error('POI ID is missing, cannot delete');
      return;
    }
    this.subscriptions.add(
      this.surveyManagementService.deleteSurvey(surveyId).subscribe({
        next: () => {
          this.setTabelle();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private async loadSurveys(id: string) {
    this.surveyManagementService.surveys = await this.getPoiSurveys(id)
    this.surveyManagementService.dataSource.data = this.surveyManagementService.surveys;
    this.surveyManagementService.updateCounters()
    this.surveyManagementService.surveys.forEach(() => this.dropdownStates.push(false));
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

  expired(expiresAt: string): boolean {
    return new Date(expiresAt) > new Date();
  }

  toggleDropdown(index: number): void {
    // Toggle only the dropdown of the specified index
    this.dropdownStates[index] = !this.dropdownStates[index];

    // Optional: Close all other dropdowns
    this.dropdownStates = this.dropdownStates.map((state, i) =>
      i === index ? state : false
    );
  }
}
