import { Component } from '@angular/core';
import { PoiManagementService } from '../../services/poi-management.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-poi-management',
  templateUrl: './poi-management.component.html',
  styleUrl: './poi-management.component.scss',
})
export class PoiManagementComponent {
  protected title_poiManagment: string = 'POI Management';

  constructor(
    private poiManagementService: PoiManagementService,
    private toastService: ToastService
  ) {}
}
