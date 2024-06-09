import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StateCounterComponent } from './components/state-counter/state-counter.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { MatSortModule } from '@angular/material/sort';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { ReportNotificationsComponent } from './components/report-notifications/report-notifications.component';
import { MapComponent } from './components/map/map.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PoiModalComponent } from './components/poi-modal/poi-modal.component';
import { PoiCardComponent } from './components/poi-card/poi-card.component';

@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    TableComponent,
    StateCounterComponent,
    SectionHeaderComponent,
    TabsComponent,
    BottomSheetComponent,
    ConfirmModalComponent,
    ReportNotificationsComponent,
    MapComponent,
    UserProfileComponent,
    PoiModalComponent,
    PoiCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    TableComponent,
    StateCounterComponent,
    SectionHeaderComponent,
    TabsComponent,
    ConfirmModalComponent,
    ReportNotificationsComponent,
    MapComponent,
    UserProfileComponent,
    PoiCardComponent,
    PoiModalComponent,
  ],
  providers: [ToastService],
})
export class SharedModule {}
