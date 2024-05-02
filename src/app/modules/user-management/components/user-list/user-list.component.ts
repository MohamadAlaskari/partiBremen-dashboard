import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { User } from '../../../../shared/models/user.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { MatTableDataSource } from '@angular/material/table';
import { CounterState } from '../../../../shared/components/state-counter/state-counter.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  // Konfiguration der Tabs, die in der Ansicht verwendet werden.
  tabConfig = [
    { label: 'View All', value: 'all' },
    { label: 'Admins', value: 'admins' },
    { label: 'Active', value: 'active' },
  ];
  // Hinzufügen einer Zustandsvariablen für den aktiven Filtertyp
  activeFilterType: 'tab' | 'search' = 'tab';

  counters: CounterState[] = [];

  // Spaltenüberschriften für die Anzeige in der Material Table.
  columns: { header: string; field: string }[] = [
    { header: 'Verified', field: 'verified' },
    { header: 'Name', field: 'name' },
    { header: 'Surname', field: 'surname' },
    { header: 'Email', field: 'email' },
    { header: 'Date of Birth', field: 'dob' },
    { header: 'Role', field: 'role' },
    { header: 'Active', field: 'active' },
  ];

  // Datenquelle für Material Table.
  dataSource = new MatTableDataSource<User>();

  // Text für das Suchfeld.
  searchText: string = '';

  // Subscription für API-Anfragen.
  private subscriptions: Subscription = new Subscription();

  isSortDropdownActive = false;

  constructor(
    private userManagementService: UserManagementService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.setCustomFilterPredicate();
  }

  // Umschalten des Zustands des Sortierungs-Dropdown-Menüs.
  toggleDropdown(): void {
    this.isSortDropdownActive = !this.isSortDropdownActive;
  }

  // Laden der Benutzer vom Server.
  loadUsers(): void {
    this.subscriptions.add(
      this.userManagementService.getUsers().subscribe({
        next: (users) => {
          this.dataSource.data = users;
          this.updateCounters();
          this.toastService.show(
            'success',
            'Success',
            'Users loaded successfully'
          );
        },
        error: (err) => {
          console.error('Failed to load users', err);

          this.toastService.show('error', 'Error', 'Failed to load users');
        },
      })
    );
  }

  // Aktualisieren der Zustandszähler basierend auf den gefilterten Daten.
  updateCounters(): void {
    const activeUsers = this.dataSource.filteredData.filter(
      (user) => user.active
    );
    const adminUsers = this.dataSource.filteredData.filter(
      (user) => user.role === 'ADMIN'
    );
    const verifiedUsers = this.dataSource.filteredData.filter(
      (user) => user.verified
    );

    this.counters = [
      { count: activeUsers.length, label: 'Aktiv' },
      { count: adminUsers.length, label: 'Admin' },
      { count: verifiedUsers.length, label: 'Verified' },
      { count: this.dataSource.filteredData.length, label: 'Total Users' },
    ];
  }

  // Anpassen des Filterkriteriums der Datenquelle
  setCustomFilterPredicate(): void {
    this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
      if (this.activeFilterType === 'search') {
        // Suchlogik nur anwenden, wenn der aktive Filtertyp 'search' ist
        return (
          data.name?.toLowerCase().includes(filter) ||
          data.surname?.toLowerCase().includes(filter) ||
          data.email?.toLowerCase().includes(filter)
        );
      } else {
        // Tab-Filterlogik nur anwenden, wenn der aktive Filtertyp 'tab' ist
        switch (filter) {
          case 'admins':
            return data.role === 'ADMIN';
          case 'active':
            return data.active === true;
          case 'all':
          default:
            return true; // Kein Filter angewendet, alle Daten anzeigen
        }
      }
    };
  }

  textFilter(data: User, filter: string): boolean {
    const transformedFilter = filter.trim().toLowerCase();
    return (
      data.name?.toLowerCase().includes(transformedFilter) ||
      data.surname?.toLowerCase().includes(transformedFilter) ||
      data.email?.toLowerCase().includes(transformedFilter)
    );
  }

  filterUsers(): void {
    this.activeFilterType = 'search'; // Setzt den aktiven Filtertyp auf 'search'
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  handleTabChange(tabValue: string): void {
    this.activeFilterType = 'tab'; // Setzt den aktiven Filtertyp auf 'tab'
    this.dataSource.filter = tabValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Bereinigen der Subscriptions beim Zerstören der Komponente.
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('Cleaned up subscriptions');
  }
}
