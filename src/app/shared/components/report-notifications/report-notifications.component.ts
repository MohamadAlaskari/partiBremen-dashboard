import { Component } from '@angular/core';

@Component({
  selector: 'app-report-notifications',
  templateUrl: './report-notifications.component.html',
  styleUrl: './report-notifications.component.scss',
})
export class ReportNotificationsComponent {
  title_clientMessages: string = 'Report Notifications';

  notifications = [
    {
      id: 1,
      reporterAvatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
      reporterName: 'Stephanie Müller',
      reportedItemTitle: 'Offensive Language in POI',
      comment: 'This POI has offensive language in the description.',
      date: 'Dec, 12',
    },
    {
      id: 2,
      reporterAvatar:
        'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVyc29ufGVufDB8fDB8fHww',
      reporterName: 'John Doe',
      reportedItemTitle: 'Spam POI',
      comment: 'This POI is just spam and does not contain useful information.',
      date: 'Jan, 5',
    },
    {
      id: 3,
      reporterAvatar: '',
      reporterName: 'Alex Johnson',
      reportedItemTitle: 'Incorrect Information in POI',
      comment:
        'The information provided in this POI is incorrect and misleading.',
      date: 'Feb, 20',
    },
    {
      id: 4,
      reporterAvatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
      reporterName: 'Maria Garcia',
      reportedItemTitle: 'Duplicate POI',
      comment: 'This POI is a duplicate of another existing POI.',
      date: 'Mar, 15',
    },
    {
      id: 5,
      reporterAvatar: '',
      reporterName: 'Michael Brown',
      reportedItemTitle: 'Inappropriate Content in POI',
      comment:
        'The content of this POI is inappropriate and should be removed.',
      date: 'Apr, 2',
    },
    {
      id: 6,
      reporterAvatar:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      reporterName: 'Emily Davis',
      reportedItemTitle: 'Offensive Comments on POI',
      comment: 'There are offensive comments associated with this POI.',
      date: 'May, 10',
    },
    {
      id: 7,
      reporterAvatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
      reporterName: 'David Wilson',
      reportedItemTitle: 'Broken Link in POI',
      comment:
        'The link provided in this POI is broken and needs to be updated.',
      date: 'Jun, 18',
    },
  ];

  tabConfig = [
    { label: 'View All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Resolved', value: 'resolved' },
  ];
  currentTabFilter = 'all';

  constructor() {}
  handleTabChange(tabValue: string): void {
    this.currentTabFilter = tabValue;
  }
  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map((n) => n.charAt(0).toUpperCase()).join('');
    return initials;
  }
}
