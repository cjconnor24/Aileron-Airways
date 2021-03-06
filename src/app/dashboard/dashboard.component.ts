import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { MapComponent } from '../map/map.component';
import * as Chart from 'chart.js'
import { TimelineApiService } from '../services/Timelineapi.service';
import { RegisterService } from '../services/register.service';
import { IdeagenService } from '../services/ideagen.service';
import { repeat } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private _dataService: IdeagenService, private elementRef: ElementRef) { }
  dataSize = 0; // initialize at 0
  chart = []; //holds chart info
  recentTimelines = []; // holds recent timelines
  DoughnutChart: any;
  recentSize = 0; // initialize at 0
  loaded: boolean = false; // display spinner


  /**
   * Pull in the statistics for rendering the dashboard charts on INIT
   */
  ngOnInit() {

    this._dataService.getTimelines().subscribe(data => {

      this.dataSize = data.length;

      let sortedData = []
      sortedData = data.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();


      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1);

      this.recentTimelines =
        sortedData.filter(x => { return x.dateCreated >= currentDate });
      console.log(this.recentTimelines)

      this.recentSize = this.recentTimelines.length;

      // // HIDE THE SPINNER AND DISPLAY THE DATA
      this.loaded = true;

      this.chartIt();

    })
  }

  /**
   * Render the chart
   */
  chartIt() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#chartId`);
    this.DoughnutChart = new Chart('chartId',
      {
        type: 'doughnut',
        data: {
          labels: ["Last 24 hours", "Total Timelines"],
          datasets: [{
            label: 'Timelines',
            data: [this.recentSize, this.dataSize],
            backgroundColor: [
              '#3A4850',
              '#0684C2'
            ],
            borderWidth: 1
          }]

        },
        options: {
          title: {
            // text:"Timelines",
            display: true
          },
          cutoutPercentage: 70,
          responsive: false,
          display: true
        }
      });
  }

}