import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var data;

    data = {
      datasets: [{
          data: [10, 20, 30]
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ]
  };

    var myDoughnutChart = new Chart('test', {
      type: 'doughnut',
      data: data,
      options: {}
  });
  
  }
  }

}
