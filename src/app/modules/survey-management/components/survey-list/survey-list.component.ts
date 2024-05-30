import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {PoiManagementService} from "../../../poi-management/services/poi-management.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Survey} from "../../../../core/models/partiBremen.model";
import {CounterState} from "../../../../shared/components/state-counter/state-counter.component";

@Component({
  selector: 'app-poi-surveys',
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent {
  private subscriptions: Subscription = new Subscription();
  private id: string | null = ''
  protected surveys : Survey[] = []

  dataSource = new MatTableDataSource<Survey>();
  surveyCounters: CounterState[] = [
    { count: 3, label: 'Aktiv' },
    { count: 3, label: 'inaktiv' },
    { count: 3, label: 'Insgesamt' },
  ];

  constructor(
    protected poiManagementService: PoiManagementService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        this.loadSurveys(this.id);
      }
    });
  }

  searchTerm: string = '';

  get filteredItems() {
    return this.surveys.filter(item =>
      Object.values(item).some((value: any) =>
        value !== null &&
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  updateCounters(): void {
    const activesurveys = this.dataSource.filteredData.filter(
      (survey) => new Date(survey.expiresAt) > new Date()
    );

    const inactivesurveys = this.dataSource.filteredData.filter(
      (survey) => new Date(survey.expiresAt) <= new Date()
    );


    this.surveyCounters = [
      { count: activesurveys.length, label: 'Aktiv' },
      { count: inactivesurveys.length, label: 'inaktiv' },
      { count: this.surveys.length, label: 'Insgesamt' },
    ];
  }

  showSurvey(id: string) {
    this.router.navigate(['poi-management/survey-anzeige', id]);
  }

  getActiveCount(): number {
    return this.poiManagementService.pois.filter(item => item.active === true).length;
  }

  getInactiveCount(): number {
    return this.poiManagementService.pois.filter(item => item.active === false).length;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private async loadSurveys(id: string) {
    this.surveys = await this.poiManagementService.getSurveys(id)
  }
}
