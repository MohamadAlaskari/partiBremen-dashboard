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
  ],
  providers: [ToastService],
})
export class SharedModule {}
