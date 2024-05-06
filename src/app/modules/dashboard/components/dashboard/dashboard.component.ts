import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var ApexCharts: any; // Declare ApexCharts to avoid TypeScript errors

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('poiChart') poiChart!: ElementRef;
  @ViewChild('userChart') userChart!: ElementRef;

  Pois = [
    { title: 'Poi 1', votes: 100 },
    { title: 'Poi 2', votes: 150 },
    { title: 'Poi 3', votes: 80 },
    { title: 'Poi 4', votes: 200 },
    { title: 'Poi 5', votes: 120 },
  ];
  users = [
    { name: 'User 1', points: 500 },
    { name: 'User 2', points: 700 },
    { name: 'User 3', points: 300 },
    { name: 'User 4', points: 600 },
    { name: 'User 5', points: 400 },
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderChart();
      this.renderUserChart();
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
  private renderUserChart() {
    import('apexcharts').then((ApexCharts) => {
      const options: any = {
        chart: {
          type: 'line',
        },
        series: [
          {
            name: 'Points',
            data: this.users.map((user) => user.points),
          },
        ],
        xaxis: {
          categories: this.users.map((user) => user.name),
        },
      };

      const chart = new ApexCharts.default(
        this.userChart.nativeElement,
        options
      );
      chart.render();
    });
  }
}
