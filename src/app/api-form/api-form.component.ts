import { Component, OnInit } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../data.service';
import { Data } from '../data';

@Component({
  selector: 'app-api-form',
  templateUrl: './api-form.component.html',
  styleUrls: ['./api-form.component.css']
})
export class ApiFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
