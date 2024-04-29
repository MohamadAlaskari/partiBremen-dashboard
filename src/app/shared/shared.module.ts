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

@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    SidenavComponent,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    TableComponent,
  ],
  providers: [ToastService],
})
export class SharedModule {}
