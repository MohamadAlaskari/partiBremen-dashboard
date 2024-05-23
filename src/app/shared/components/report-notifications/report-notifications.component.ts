import { Component } from '@angular/core';
import { ReportNotificationsService } from '../../services/report-notifications.service';
import { Report, User } from '../../../core/models/partiBremen.model';
import { UserManagementService } from '../../../modules/user-management/services/user-management-service/user-management.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-notifications',
  templateUrl: './report-notifications.component.html',
  styleUrl: './report-notifications.component.scss',
})
export class ReportNotificationsComponent {
  title_clientMessages: string = 'Report Notifications';
  notifications: Report[] = [];
  filteredNotifications: Report[] = [];
  usersMap: Map<string, User> = new Map();

  tabConfig = [
    { label: 'View All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Resolved', value: 'resolved' },
  ];
  currentTabFilter = 'all';

  constructor(
    private reportService: ReportNotificationsService,
    private userService: UserManagementService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getReports().subscribe({
      next: (reports: Report[]) => {
        this.notifications = reports;
        this.filterNotifications(this.currentTabFilter);
        this.loadUsersForReports();
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.toastService.show('error', 'Error', 'Error loading reports');
      },
    });
  }

  private loadUsersForReports(): void {
    const userIds = new Set(
      this.notifications.map((report) => report.reporterId)
    );
    userIds.forEach((userId) => {
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.usersMap.set(userId, user);
        },
        (error) => {
          console.error('Error loading user:', error);
          this.toastService.show('error', 'Error', 'Error loading user');
        }
      );
    });
  }

  handleTabChange(tabValue: string): void {
    this.currentTabFilter = tabValue;
    this.filterNotifications(tabValue);
  }

  filterNotifications(tabValue: string): void {
    if (tabValue === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(
        (report) => report.status.toLowerCase() === tabValue
      );
    }
  }

  getInitials(name: string, surname: string): string {
    const names = name.split(' ');
    const surnames = surname.split(' ');

    const fname = names.map((n) => n.charAt(0).toUpperCase()).join('');
    const fsurname = surnames.map((n) => n.charAt(0).toUpperCase()).join('');

    return fname + fsurname;
  }

  getReportedItemType(report: Report): string {
    if (report.reportedUserId) {
      return 'Reported User';
    } else if (report.reportedPoiId) {
      return 'Reported POI';
    } else if (report.reportedCommentId) {
      return 'Reported Comment';
    } else {
      return 'Reported Item';
    }
  }

  getUserById(userId: string): User | undefined {
    return this.usersMap.get(userId);
  }
  navigateToReport(reportId: string): void {
    this.router.navigate(['/report-management', reportId]);
  }
}
