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


export class MapComponent implements OnInit {

  lat: number;// = 55.8691;
  lng: number;// = -4.4351;
  zoom: number = 12;

  constructor() {}
  
  @Input() eventName: string;
  @Output() droppedPin: EventEmitter<EventLocation> = new EventEmitter<EventLocation>();
  @Input() existingLocation: any;
  
  
  defaultPosition = {
    lat: 55.8691,
    lng: -4.4351,
    // label: 'A',
    draggable: false
  };
  
  markers: marker[] = [this.defaultPosition];

  ngOnInit() {


  
    
    // if(this.existingLocation!==null){
      if(this.existingLocation){
    this.defaultPosition.lat = this.existingLocation.latitude;
    this.defaultPosition.lng = this.existingLocation.longitude;
      } else {
        this.droppedPin.emit(new EventLocation('',this.defaultPosition.lat, this.defaultPosition.lat));
      }
    // }
    // if (navigator) {
      
      //   navigator.geolocation.getCurrentPosition(pos => {
        //     this.lng = +pos.coords.longitude;
        //     this.lat = +pos.coords.latitude;
    //     this.markers[0] = ({
    //       lat: +pos.coords.latitude,
    //       lng: +pos.coords.longitude,
    //       draggable: false
    //     });
    //   });

    // }



  }


  mapClicked($event: MouseEvent) {
    console.log($event);
    
    this.markers[0] = ({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });

    this.droppedPin.emit(new EventLocation('',$event.coords.lat, $event.coords.lng));

  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


}


interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}