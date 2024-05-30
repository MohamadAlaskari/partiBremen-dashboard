import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { User } from '../../../../core/models/partiBremen.model';
import { PoiManagementService } from '../../../poi-management/services/poi-management.service';
import { Poi } from '../../../../shared/models/poi.model';
import { CommentManagementService } from '../../../comment-management/services/comment-management.service';
import { Comment } from '../../../../shared/models/comment.model';
import Chart from 'chart.js/auto';
import { ReportNotificationsService } from '../../../../shared/services/report-notifications.service';
import { Subscription } from 'rxjs';

import { Report } from '../../../../core/models/partiBremen.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('poiChart') poiChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('userChart') userChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ageChart') ageChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reportStatusChart') reportStatusChart!: ElementRef<HTMLCanvasElement>;


  users: User[] = [];
  selectedChart: string = 'poi'; // Default to POI chart
  userstab: { name: string, age: number }[] = [];
  Pois: Poi[] = [];
  comments: Comment[] = [];
  poiistab: { title: string, votes: number }[] = [];
  usersCount: number = 0;
  poisCount: number = 0;
  commentscount: number = 0;
  private subscription!: Subscription;
  Reports: Report[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userManagementService: UserManagementService,
    private poiManagementService: PoiManagementService,
    private CommentManagementService: CommentManagementService,
    private reportService: ReportNotificationsService,
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadPois();
    this.loadcommetns();

    this.loadReports();


    console.log(this.Reports);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  loadReports(): void {
    this.subscription = this.reportService.getReports().subscribe({
      next: (Reports: Report[]) => {
        this.Reports = Reports;
        console.log('Reports loaded successfully:', Reports);
        this.renderReportStatusChart(); // Render chart after data is loaded
      },
      error: (err) => {
        console.error('Failed to load reports', err);
      },
    });
  }
  countStatus(): { [key: string]: number } {
    const statusCounts: { [key: string]: number } = {
      PENDING: 0,
      DISMISSED: 0,
      RESOLVED: 0,
      REVIEWED: 0
    };

    this.Reports.forEach(report => {
      statusCounts[report.status]++;
    });

    return statusCounts;
  }

  getStatusPercentage(status: string): number {
    const statusCounts = this.countStatus();
    const totalCount = this.Reports.length;
    const statusCount = statusCounts[status];
    return (statusCount / totalCount) * 100;
}

  loadcommetns() {
    this.CommentManagementService.getComments().subscribe({
      next: (comments) => {
        this.comments = comments;
        this.commentscount = this.comments.length;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
      },
    });
  }

  loadPois(): void {
    this.poiManagementService.getallpoi().subscribe({
      next: (Pois) => {
        this.Pois = Pois;
        console.log('POIs loaded:', this.Pois);
        this.countVotes(); // After loading POIs, count votes
        if (isPlatformBrowser(this.platformId)) {
          this.renderChart(); // Ensure renderChart is called after POIs are loaded
        }
        this.poisCount = this.Pois.length; // Update poisCount after data is fetched
      },
      error: (error) => {
        console.error('Error loading POIs:', error);
      }
    });
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
        this.usersCount = this.users.length; // Update usersCount after data is fetched
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

  countVotes(): void {
    this.poiistab = this.Pois.map(poi => {
      const votes = poi.votings ? poi.votings.filter(voting => voting.voteType === "UP").length : 0;
      console.log(`POI Title: ${poi.titel}`);
      console.log('Votings:', poi.votings);
      console.log(`Votes Counted: ${votes}`);
      return {
        title: poi.titel,
        votes: votes
      };
    });
    console.log('PoiListab:', this.poiistab);
  }

  renderReportStatusChart() {
    const ctx = this.reportStatusChart.nativeElement.getContext('2d');
    if (ctx) {
      const statusCounts = this.countStatus();
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(statusCounts),
          datasets: [{
            label: 'Report Status',
            data: Object.values(statusCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', // PENDING
              'rgba(255, 159, 64, 0.5)', // DISMISSED
              'rgba(54, 162, 235, 0.5)', // RESOLVED
              'rgba(75, 192, 192, 0.5)'  // REVIEWED
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for reportStatusChart');
    }
  }


  private renderChart() {
    console.log('PoiListab before rendering chart:', this.poiistab); // Debug log

    const ctx = this.poiChart.nativeElement.getContext('2d');
    if (ctx) { // Add null check
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.poiistab.map(poi => poi.title),
          datasets: [{
            label: 'Voting Numbers',
            data: this.poiistab.map(poi => poi.votes),
            backgroundColor: 'rgba(78, 115, 223, 0.5)',
            borderColor: 'rgba(78, 115, 223, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for poiChart');
    }
  }

  private renderAgeChart() {
    const ctx = this.ageChart.nativeElement.getContext('2d');
    if (ctx) { // Add null check
      const ageGroups = {
        'under 30': this.userstab.filter(user => user.age < 30).length,
        '30-60': this.userstab.filter(user => user.age >= 30 && user.age <= 60).length,
        '60 plus': this.userstab.filter(user => user.age > 60).length
      };

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(ageGroups),
          datasets: [{
            data: Object.values(ageGroups),
            backgroundColor: ['#76D7C4 ', '#AED6F1', '#FADBD8'],
            borderColor: ['#D5F5E3 ', '#AED6F1', '#FADBD8'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          }
        }
      });
    } else {
      console.error('Failed to get 2D context for ageChart');
    }
  }


  saveChartAsImage(chartCanvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = chartCanvas.toDataURL('image/png');
    link.download = 'chart.png';
    link.click();
  }

  getTop10POIs(): { title: string, votes: number }[] {
    // Sort poiistab in descending order of votes
    const sortedPOIs = this.poiistab.slice().sort((a, b) => b.votes - a.votes);
    // Return the top 10 POIs
    return sortedPOIs.slice(0, 10);
  }

  showChart(chartType: string) {
    this.selectedChart = chartType;
  }
}
