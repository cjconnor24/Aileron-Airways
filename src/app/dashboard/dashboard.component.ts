import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Chart } from 'chart.js';
import { TimelineApiService } from '../services/Timelineapi.service';
import { RegisterService } from '../services/register.service';
import { IdeagenService } from '../services/ideagen.service';
import { repeat } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _dataService: IdeagenService) { }
  dataSize = 0; // initialize at 0
  chart = []; //holds chart info
  recentTimelines = []; // holds recent timelines


   ngOnInit() {


    this._dataService.getTimelines().subscribe(data => {

      this.dataSize = data.length;

      let sortedData = []
      sortedData = data.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();

      console.log(sortedData)

      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);


      
    })
  }
  
}