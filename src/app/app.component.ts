import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import { Timelines } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  title = 'Aileron Airways';

data: Timelines[] = [];

constructor(
  private DataService:DataService){

}

public ngOnInit(){
  this.DataService
    .getAllData()
    .subscribe(
      (data) => {
        this.data = data;
  });
}
}
