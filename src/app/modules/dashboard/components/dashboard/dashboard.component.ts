import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service'
import { User } from '../../../../core/models/partiBremen.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('poiChart') poiChart!: ElementRef;
  @ViewChild('userChart') userChart!: ElementRef;
  @ViewChild('ageChart') ageChart!: ElementRef;
  users: User[] = [];
  selectedChart: string = 'poi'; // Default to POI chart
  userstab: { name: string, age: number }[] = [];
  Pois = [
    { title: 'Poi 1', votes: 100 },
    { title: 'Poi 2', votes: 150 },
    { title: 'Poi 3', votes: 80 },
    { title: 'Poi 4', votes: 200 },
    { title: 'Poi 5', votes: 120 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private userManagementService: UserManagementService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userManagementService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.transformUsers();
        console.log('Users loaded:', this.users);
        console.log('User table:', this.userstab);
        if (isPlatformBrowser(this.platformId)) {
          this.renderAgeChart(); // Ensure renderAgeChart is called after users are loaded
        }
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  transformUsers(): void {
    this.userstab = this.users.map(user => ({
      name: user.name,
      age: this.calculateAge(user.dob ? new Date(user.dob) : new Date())
    }));
  }

  calculateAge(dob: Date): number {
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
    }
  }

  private renderChart() {
    import('apexcharts').then((ApexCharts) => {
      const options: any = {
        chart: {
          type: 'bar',
        },
        series: [
          {
            name: 'Voting Numbers',
            data: this.Pois.map((Poi) => Poi.votes),
          },
        ],
        xaxis: {
          categories: this.Pois.map((Poi) => Poi.title),
        },
      };

      const chart = new ApexCharts.default(
        this.poiChart.nativeElement,
        options
      );
      chart.render();
    });
  }

  private renderAgeChart() {
    import('apexcharts').then((ApexCharts) => {
      const ageGroups = {
        'under 30': this.userstab.filter((user) => user.age < 30).length,
        '30-60': this.userstab.filter((user) => user.age >= 30 && user.age <= 60).length,
        '60 plus': this.userstab.filter((user) => user.age > 60).length,
      };

      const options: any = {
        chart: {
          type: 'pie',
        },
        labels: Object.keys(ageGroups),
        series: Object.values(ageGroups),
      };

      const chart = new ApexCharts.default(
        this.ageChart.nativeElement,
        options
      );
      chart.render();
    });
  }

  showChart(chartType: string) {
    this.selectedChart = chartType;
  }
}
