import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../../environment';
import { Poi } from '../../../../core/models/partiBremen.model';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  map!: mapboxgl.Map;
  markers: { [key: string]: mapboxgl.Marker } = {};

  initializeMap(
    container: string,
    center: [number, number],
    zoom: number
  ): void {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: container,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    // Add navigation control (zoom and rotation controls) to the left
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');

    // Add full screen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add custom 3D toggle control
    const toggle3DControl = this.create3DToggleControl();
    this.map.addControl(toggle3DControl, 'top-right');

    // Add geolocate control to the map
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserLocation: true,
    });
    this.map.addControl(geolocateControl, 'bottom-right');

    // Add style switcher control
    const styleSwitcherControl = this.createStyleSwitcherControl();
    this.map.addControl(styleSwitcherControl, 'top-left');
  }

  addMarkers(pois: Poi[]): void {
    pois.forEach((poi) => {
      const color = poi.active ? '#5ee560' : '#e55e5e';
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = color;
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([poi.longitude, poi.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<b>${poi.titel}</b><br>${poi.description}`
          )
        )
        .addTo(this.map);

      this.markers[poi.id] = marker;
    });
  }

  toggle3DMode(): void {
    const layerId = '3d-buildings';

    if (this.map.getLayer(layerId)) {
      const visibility = this.map.getLayoutProperty(layerId, 'visibility');
      this.map.setLayoutProperty(
        layerId,
        'visibility',
        visibility === 'visible' ? 'none' : 'visible'
      );

      // Reset the pitch and bearing when 3D is turned off
      if (visibility === 'visible') {
        this.map.easeTo({ pitch: 0, bearing: 0 });
      }

      console.log('3D visibility toggled:', visibility);
    } else {
      if (!this.map.getSource('composite')) {
        this.map.addSource('composite', {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v8',
        });
      }
      this.map.addLayer({
        id: layerId,
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
        layout: {
          visibility: 'visible',
        },
      });

      // Set the pitch and bearing to give a 3D perspective
      this.map.easeTo({ pitch: 60, bearing: -20 });

      console.log('3D buildings layer added');
    }
  }

  changeMapStyle(style: string): void {
    this.map.setStyle(`mapbox://styles/mapbox/${style}`);
    // Re-add the 3D layer if it was added
    this.map.on('style.load', () => {
      const layerId = '3d-buildings';
      if (this.map.getLayer(layerId)) {
        this.map.setLayoutProperty(layerId, 'visibility', 'visible');
      }
    });
  }

  toggleStreetViewMode(): void {
    this.map.easeTo({
      pitch: 80,
      bearing: 0,
      center: this.map.getCenter(),
      zoom: this.map.getZoom(),
    });
  }

  private create3DToggleControl() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-badge-3d-fill"></i>'; // Bootstrap icon for buildings
    button.style.background = 'white';
    button.style.border = 'none';
    button.style.width = '30px';
    button.style.height = '30px';
    button.style.cursor = 'pointer';
    button.onclick = () => this.toggle3DMode();
    controlDiv.appendChild(button);

    return {
      onAdd: () => controlDiv,
      onRemove: () => controlDiv.parentNode?.removeChild(controlDiv),
    };
  }

  private createStyleSwitcherControl() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'mapboxgl-ctrl mapboxgl-ctrl-group style-switcher';

    const styles = [
      { id: 'satellite-streets-v12', label: 'Satellite', icon: 'satellite' },
      { id: 'light-v10', label: 'Light', icon: 'light' },
      { id: 'dark-v10', label: 'Dark', icon: 'dark' },
      { id: 'streets-v12', label: 'Streets', icon: 'streets' },
      { id: 'outdoors-v11', label: 'Outdoors', icon: 'outdoors' },
    ];

    styles.forEach((style) => {
      const button = document.createElement('button');
      button.className = `style-button ${style.icon}`;
      button.title = style.label;
      button.onclick = () => this.changeMapStyle(style.id);
      controlDiv.appendChild(button);
    });

    return {
      onAdd: () => controlDiv,
      onRemove: () => controlDiv.parentNode?.removeChild(controlDiv),
    };
  }
}
