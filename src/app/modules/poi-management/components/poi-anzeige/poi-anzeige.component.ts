import { Component } from '@angular/core';
import {PoiManagementService} from "../../services/poi-management.service";

@Component({
  selector: 'app-poi-anzeige',
  templateUrl: './poi-anzeige.component.html',
  styleUrl: './poi-anzeige.component.scss'
})
export class PoiAnzeigeComponent {
  protected poiName: any;
  protected poiBeschreibung: any;
  protected poiAdresse: any;
  protected poiStatus: any;

  constructor(private poiManagementService: PoiManagementService) { }

  ngOnInit(): void {
    this.poiName = this.poiManagementService.getPoi().name;
    this.poiBeschreibung = this.poiManagementService.getPoi().beschreibung;
    this.poiAdresse = this.poiManagementService.getPoi().adresse;
    this.poiStatus = this.poiManagementService.getPoi().status;
  }

}
