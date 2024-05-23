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

    // Add navigation control (zoom and rotation controls)
    this.map.addControl(new mapboxgl.NavigationControl());

    // Add full screen control
    this.map.addControl(new mapboxgl.FullscreenControl());

    // Add custom 3D toggle control
    const toggle3DControl = this.create3DToggleControl();
    this.map.addControl(toggle3DControl);
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
      console.log('3D buildings layer added');
    }
  }

  private create3DToggleControl() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'mapboxgl-ctrl';

    const button = document.createElement('button');
    button.textContent = 'Toggle 3D';
    button.onclick = () => this.toggle3DMode();
    controlDiv.appendChild(button);

    return {
      onAdd: () => controlDiv,
      onRemove: () => controlDiv.parentNode?.removeChild(controlDiv),
    };
  }
}
