import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environment';
import { Poi } from '../../../core/models/partiBremen.model';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  map!: mapboxgl.Map;
  markers: { [key: string]: mapboxgl.Marker } = {};
  is3DMode: boolean = false; // Hinzugefügte Eigenschaft, um den 3D-Modus zu verfolgen
  marker: mapboxgl.Marker | null = null;
  onMarkerClickCallback: ((poi: Poi) => void) | null = null;
  onMapClickCallback:
    | ((coordinates: { latitude: number; longitude: number }) => void)
    | null = null;

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
    this.map.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      if (this.onMapClickCallback) {
        this.onMapClickCallback({ latitude: lat, longitude: lng }); // Call the callback with the coordinates
      }
      // Add or move marker to the clicked location
      if (!this.marker) {
        this.marker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(this.map);
      } else {
        this.marker.setLngLat([lng, lat]);
      }
    });
    // Geocoder hinzufügen
    const geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder, 'top-left');

    // Add navigation control (zoom and rotation controls) to the left
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');

    // Add full screen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add custom 3D toggle control
    const toggle3DControl = this.create3DToggleControl();
    this.map.addControl(toggle3DControl, 'bottom-right');

    // Add geolocate control to the map
    const geolocateControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserLocation: true,
    });
    this.map.addControl(geolocateControl, 'top-right');

    // Add style switcher control
    const styleSwitcherControl = this.createStyleSwitcherControl();
    this.map.addControl(styleSwitcherControl, 'top-left');
  }

  addMarkers(pois: Poi | Poi[]): void {
    // Wenn pois kein Array ist, konvertiere es in ein Array mit einem Element
    if (!Array.isArray(pois)) {
      pois = [pois];
    }

    pois.forEach((poi) => {
      const color = poi.active ? '#5ee560' : '#e55e5e';
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = color;
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';

      if (
        (poi.votings.filter((vote) => vote.voteType === 'UP').length > 3 &&
          poi.active) ||
        (poi.comments.length > 5 && poi.active)
      ) {
        el.classList.add('pulsate');
      }

      const marker = new mapboxgl.Marker(el)
        .setLngLat([poi.longitude, poi.latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<b>${poi.titel}</b><br>${poi.description}`
          )
        )
        .addTo(this.map);

      marker.getElement().addEventListener('click', () => {
        if (this.onMarkerClickCallback) {
          this.onMarkerClickCallback(poi);
        }
      });
      this.markers[poi.id] = marker;
    });
  }
  setOnMapClickCallback(
    callback: (coordinates: { latitude: number; longitude: number }) => void
  ): void {
    this.onMapClickCallback = callback; // Set the callback function
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

      if (this.is3DMode) {
        // Wechsel zur Standardansicht
        this.map.easeTo({ pitch: 0, bearing: 0 });
      } else {
        // Wechsel zur 3D-Ansicht
        this.map.easeTo({ pitch: 60, bearing: -20 });
      }

      this.is3DMode = !this.is3DMode; // Zustand umschalten
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

      // Wechsel zur 3D-Ansicht
      this.map.easeTo({ pitch: 60, bearing: -20 });
      this.is3DMode = true;

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
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333" class="bi bi-badge-3d-fill" viewBox="0 0 16 16">
  <path d="M10.157 5.968h-.844v4.06h.844c1.116 0 1.621-.667 1.621-2.02 0-1.354-.51-2.04-1.621-2.04"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.184 4.368c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zM8.126 11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984H8.126z"/>
</svg>
    `; // SVG Icon for buildings
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

  setOnMarkerClickCallback(callback: (poi: Poi) => void): void {
    this.onMarkerClickCallback = callback;
  }
}
