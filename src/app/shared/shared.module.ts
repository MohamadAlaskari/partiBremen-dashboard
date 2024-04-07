import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidenavComponent,HeaderComponent, FooterComponent],
})
export class SharedModule {}
