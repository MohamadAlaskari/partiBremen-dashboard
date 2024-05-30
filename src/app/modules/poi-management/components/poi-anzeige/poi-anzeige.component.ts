import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PoiManagementService } from "../../services/poi-management.service";
import { Subscription } from "rxjs";
import { ToastService } from "../../../../shared/services/toast.service";
import { Updatepoi } from "../../../../shared/models/updatepoi.model";
import {Poi} from "../../../../shared/models/poi.model";
import {User} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-poi-anzeige',
  templateUrl: './poi-anzeige.component.html',
  styleUrls: ['./poi-anzeige.component.scss']
})
export class PoiAnzeigeComponent implements OnInit, OnDestroy {
  private map: any;
  private marker: any;
  private subscriptions: Subscription = new Subscription();
  private L: any; // Klassenvariable für Leaflet

  constructor(
    protected poiManagementService: PoiManagementService,
    @Inject(PLATFORM_ID) private platformId: any,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.poiManagementService.currentPoi$.subscribe((currentPoi: any) => {
        console.log('currentPoi received:', currentPoi);
        if (this.map) {
          this.updateMap();
        } else {
          this.startMap();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  startMap(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        this.initMap(L);
        this.L = L
      }).catch(err => {
        console.error('Leaflet konnte nicht geladen werden:', err);
      });
    }
  }

  private createCustomIcon(L: any): any {
    return L.icon({
      iconUrl: 'assets/marker-icon.png', // Pfad zu deinem Bild
      iconSize: [38, 95], // Größe des Icons
      iconAnchor: [22, 94], // Punkt im Icon, der den Marker positioniert
      popupAnchor: [-3, -76] // Punkt, von dem das Popup zeigt
      // shadowUrl: 'assets/images/marker-shadow.png', // Optional, wenn du einen Schatten verwenden möchtest
      // shadowSize: [50, 64], // Größe des Schattens
      // shadowAnchor: [4, 62]  // Punkt im Schatten, der den Schatten positioniert
    });
  }

  private initMap(L: any): void {
    const currentPoi = new Poi("1", "12.05.2002", "12.05.2002", "y", true,
      new User("1", "12.05.2002", "12.05.2002", "Ja", "no",  new Date(), "ewfw@gmail.com", "y", true, null, true,"UNBLOCKED",null),
      [],[],[],[],[], "y", 3, 3)
    if (currentPoi) {
      let latitude = currentPoi.latitude;
      let longitude = currentPoi.longitude;

      if (!isNaN(latitude) && !isNaN(longitude)) {
        console.log('Initializing map with coordinates:', latitude, longitude);

        this.map = L.map('map').setView([latitude, longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);

        const customIcon = this.createCustomIcon(L);

        //this.marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(this.map)
        //  .openPopup();
      } else {
        console.error('Invalid coordinates:', latitude, longitude);
      }
    } else {
      console.error('currentPoi is null or undefined');
    }
  }

  protected updateMap(): void {
    const currentPoi = this.poiManagementService.currentPoi;
    let latitude = currentPoi.latitude;
    let longitude = currentPoi.longitude;

    if (!isNaN(latitude) && !isNaN(longitude)) {
      this.map.setView([latitude, longitude], 15);

      const customIcon = this.createCustomIcon(this.L);
      //this.marker.setLatLng([latitude, longitude])
      //  .setIcon(customIcon)
      //  .openPopup();
      console.log('Updating map with new coordinates:', latitude, longitude);
    } else {
      console.error('Invalid coordinates:', latitude, longitude);
    }
  }

  updatePoi(): void {
    const currentPoi = this.poiManagementService.currentPoi;
    const poiId = currentPoi?.id;
    const poi = new Updatepoi(currentPoi.titel, currentPoi.description, currentPoi.active, currentPoi.creator.id, currentPoi.latitude, currentPoi.longitude);

    console.log("POI ID:", poiId);
    console.log("POI Data:", poi);

    if (!poiId || !poi) {
      console.error('PoiId or Poi is missing, cannot update');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.updatePoi(poiId, poi).subscribe(() => {
          console.log("POI updated successfully");
        },
        error => {
          console.error('Could not update POI', error);
        })
    );
  }

  deletePoi(): void {
    const poiId = this.poiManagementService.currentPoi?.id;
    if (!poiId) {
      console.error('POI ID is missing, cannot delete');
      return;
    }

    this.subscriptions.add(
      this.poiManagementService.deletePoi(poiId).subscribe({
        next: () => {
          this.poiManagementService.loadPois();
          this.poiManagementService.currentPoi = null;
          this.toastService.show(
            'success',
            'Success',
            'POI deleted successfully'
          );
        },
        error: (error) => {
          this.toastService.show(
            'error',
            'Error',
            `Error deleting POI: ${error.message}`
          );
        },
      })
    );
  }
}
