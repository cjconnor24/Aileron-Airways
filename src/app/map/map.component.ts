import { ElementRef, NgZone, OnInit, ViewChild, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { AgmCoreModule, AgmMarker } from '@agm/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})


export class MapComponent implements OnInit {
    lat: number;// = 55.8691;
    lng: number;// = -4.4351;
    zoom: number = 8;
    


  constructor() {
    
  }
  

  @Input() eventName: string;

  
  ngOnInit() {
    if (navigator)
    {

    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.markers[0]=({
          lat: +pos.coords.latitude,
          lng: +pos.coords.longitude,
          draggable: false
        });
      });
      
        }
      }


  mapClicked($event: MouseEvent) {
    console.log($event);
    this.markers[0]=({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    });
    
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
	  {
      lat: 55.8691,
      lng: -4.4351,
		  label: 'A',
		  draggable: false
    }];
    
  }
  
      
    interface marker {
      lat: number;
      lng: number;
      label?: string;
      draggable: boolean;
    }