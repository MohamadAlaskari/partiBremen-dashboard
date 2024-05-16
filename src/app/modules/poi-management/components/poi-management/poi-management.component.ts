import { Component } from '@angular/core';
import { PoiManagementService } from '../../services/poi-management.service';
import {ToastService} from "../../../../shared/services/toast.service";
import {Subscription} from "rxjs";
import {User} from "../../../../shared/models/user.model";
import {Poi} from "../../../../shared/models/poi.model";

@Component({
  selector: 'app-poi-management',
  templateUrl: './poi-management.component.html',
  styleUrl: './poi-management.component.scss'
})
export class PoiManagementComponent {

  constructor(private poiManagementService: PoiManagementService,
              private toastService: ToastService) { }

  title_poiManagment: string = "POI Management";
}
