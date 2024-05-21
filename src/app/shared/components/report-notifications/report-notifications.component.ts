import { Component } from '@angular/core';

@Component({
  selector: 'app-report-notifications',
  templateUrl: './report-notifications.component.html',
  styleUrl: './report-notifications.component.scss',
})
export class ReportNotificationsComponent {
  title_clientMessages: string = 'Client Messages';
  tabConfig = [
    { label: 'View All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Resolved', value: 'resolved' },
    { label: 'Resolved', value: 'resolved' },

  ];
  currentTabFilter = 'all';

  constructor() {}
  handleTabChange(tabValue: string): void {
    this.currentTabFilter = tabValue;
  }
}
