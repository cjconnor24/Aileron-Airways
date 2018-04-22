import { ElementRef, NgZone, OnInit, ViewChild, Component, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { AgmCoreModule, AgmMarker } from '@agm/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { EventLocation } from '../models/event-location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

/**
 * Map component for Google Maps interactions
 */
export class MapComponent implements OnInit {

  lat: number;// = 55.8691;
  lng: number;// = -4.4351;
  zoom: number = 12;

  constructor() { }

  @Input() eventName: string;
  @Output() droppedPin: EventEmitter<EventLocation> = new EventEmitter<EventLocation>();
  @Input() existingLocation: any;


  // DEFAULT POSITION MARKER
  defaultPosition = {
    lat: 55.8691,
    lng: -4.4351,
    // label: 'A',
    draggable: false
  };

  // MARKER ARRAY IF DEALING WITH MORE THAN ONE
  markers: marker[] = [this.defaultPosition];

  /**
   * INTIALISE THE COMPONENT
   */
  ngOnInit() {


    if (this.existingLocation) {

      this.defaultPosition.lat = this.existingLocation.latitude;
      this.defaultPosition.lng = this.existingLocation.longitude;

    } else {

      this.droppedPin.emit(new EventLocation('', this.defaultPosition.lat, this.defaultPosition.lat));

    }

  }

  /**
   * If the map is clicked, drop the marker and emit event.
   * @param  event
   */
  mapClicked($event: MouseEvent) {
    console.log($event);

    this.markers[0] = ({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });

    this.droppedPin.emit(new EventLocation('', $event.coords.lat, $event.coords.lng));

  }

  /**
   * If marker is clicked, display console log.
   * @param label Marker label
   * @param index Marker index
   */
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  /**
   * If marker is dragged, output data to console
   * @param m Marker which is selected
   * @param  Event
   */
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


}

/**
 * Interface to represent marker.
 */
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}