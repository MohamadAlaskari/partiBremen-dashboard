import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserManagementService } from '../../../user-management/services/user-management-service/user-management.service';
import { User } from '../../../../core/models/partiBremen.model';
import { PoiManagementService } from '../../../poi-management/services/poi-management.service';
import { Poi } from '../../../../shared/models/poi.model';
import { CommentManagementService } from '../../../comment-management/services/comment-management.service';
import { Comment } from '../../../../shared/models/comment.model';

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
  Pois: Poi[] = [];
  comments: Comment[] = [];
  poiistab: { title: string, votes: number }[] = [];
  usersCount: number = 0;
  poisCount: number = 0;
  commentscount: number = 0;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userManagementService: UserManagementService,
    private poiManagementService: PoiManagementService,
    private CommentManagementService: CommentManagementService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadPois();
    this.loadcommetns();
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
      })

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // You can do something here if needed
    }
  }

  private renderChart() {
    console.log('PoiListab before rendering chart:', this.poiistab); // Debug log
    import('apexcharts').then((ApexCharts) => {
      const options: any = {
        chart: {
          type: 'bar',
        },
        series: [
          {
            name: 'Voting Numbers',
            data: this.poiistab.map((poi) => poi.votes), // Access poiistab here
          },
        ],
        xaxis: {
          categories: this.poiistab.map((poi) => poi.title), // Access poiistab here
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
