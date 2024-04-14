import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './services/toast.service';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SidenavComponent,
    FooterComponent,
    HeaderComponent,
    ToastComponent,
  ],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [SidenavComponent, HeaderComponent, FooterComponent, ToastComponent],
  providers: [ToastService],
})
export class SharedModule {}
