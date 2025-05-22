import {Component, OnInit, ViewChild} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import {Popover} from 'primeng/popover';
import {NgIf} from '@angular/common';
import {PrimeTemplate} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {NeueMeldungDialogComponent} from './neue-meldung-dialog/neue-meldung-dialog.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports: [
    Popover,
    NgIf,
    PrimeTemplate,
    Button,
  ],
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit{
  ref: DynamicDialogRef | undefined;
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 30.2672;
  lng = -97.7431;
  selectedFeature: any;
  popoverAnchor: HTMLDivElement | null = null;


  // Get a reference to the popover component
  @ViewChild('popover') popover: Popover | undefined;

  austinPointsData: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-97.693686723567652, 30.282059053494251]
        },
        properties: {
          title: 'Austin 1'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-97.763899906620225, 30.251333606714322]
        },
        properties: {
          title: 'Austin 2'
        }
      }
    ]
  };

  constructor(private dialogService: DialogService) {
  }

  ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    this.map.on('load', ()=> {
      this.map?.addSource(
        'Austin Hex',
        {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': [],
            'geometry': {
              'type': 'Polygon',
              'coordinates': [
                [
                  [ -97.792921355615277, 30.127749592004189 ],
                  [ -97.792921355615277, 30.196912993949898 ],
                  [ -97.723644348336762, 30.231476492188843 ],
                  [ -97.654367341058247, 30.196912993949898 ],
                  [ -97.654367341058247, 30.127749592004189 ],
                  [ -97.723644348336762, 30.093149704984011 ],
                  [ -97.792921355615277, 30.127749592004189 ]
                ]
              ]
            }
          }
        }
      );

      this.map?.addSource('Austin Points', {
        type: 'geojson',
        data: this.austinPointsData
      });

      if (this.map) {
        this.map?.on('click', (e: mapboxgl.MapMouseEvent) => {
          // First, check if the click was on an existing point in "Austin Points"
          const features = this.map!.queryRenderedFeatures(e.point, { layers: ['Austin Points'] });
          if (features && features.length > 0) {
            // User clicked an existing point. Use that feature.
            const feature = features[0];
            this.selectedFeature = feature;
            if (feature.geometry && feature.geometry.type === 'Point') {
              const coords = feature.geometry.coordinates as [number, number];
              this.showPopoverAt(coords, e.originalEvent);
            }
          } else {
            // No existing point was clicked; add a new point.
            const newFeature: GeoJSON.Feature = {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [e.lngLat.lng, e.lngLat.lat]
              },
              properties: {
                title: 'Neue Meldung'
              }
            };

            // Add the new feature to our FeatureCollection and update the source.
            this.austinPointsData.features.push(newFeature);
            const source = this.map!.getSource('Austin Points') as mapboxgl.GeoJSONSource;
            source.setData(this.austinPointsData);

            // Set this new feature as the selected one.
            this.selectedFeature = newFeature;
            this.showPopoverAt([e.lngLat.lng, e.lngLat.lat], e.originalEvent);
          }
        });

        // Optionally, update the cursor when hovering over points.
        this.map?.on('mouseenter', 'Austin Points', () => {
          this.map!.getCanvas().style.cursor = 'pointer';
        });
        this.map?.on('mouseleave', 'Austin Points', () => {
          this.map!.getCanvas().style.cursor = '';
        });
      }
      this.map?.addLayer({
        'id': 'Austin Hex',
        'type': 'fill',
        'source': 'Austin Hex',
        'layout': {},
        'paint': {
          'fill-color': '#0080ff',
          'fill-opacity': 0.5
        }
      });
      this.map?.addLayer({
        'id': 'Austin Points',
        'type': 'circle',
        'source': 'Austin Points',
        'layout': {},
        'paint': {
          'circle-color': 'blue',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white'
        }
      });
    });
  }

  private showPopoverAt(coords: [number, number], originalEvent: MouseEvent) {
    // Convert geographic coordinates to screen (pixel) coordinates.
    const screenPoint = this.map!.project(coords);

    // Remove any existing anchor.
    if (this.popoverAnchor) {
      document.body.removeChild(this.popoverAnchor);
      this.popoverAnchor = null;
    }

    // Create an invisible anchor div.
    const anchor = document.createElement('div');
    anchor.style.position = 'absolute';
    const rect = this.map!.getContainer().getBoundingClientRect();
    anchor.style.left = `${rect.left + screenPoint.x}px`;
    anchor.style.top = `${rect.top + screenPoint.y}px`;
    // Adjust the anchor so the popover appears above the point.
    anchor.style.transform = 'translate(-50%, -100%)';
    document.body.appendChild(anchor);
    this.popoverAnchor = anchor;

    // Show the popover using the anchor as the target.
    this.popover?.show({
      originalEvent,
      target: anchor
    });
  }

  protected openNeueMeldung() {
    this.ref = this.dialogService.open(NeueMeldungDialogComponent, {
      header: 'Neue Meldung',
      width: '70%',
      height: '70%',
      closable: true,
    })
  }
}
