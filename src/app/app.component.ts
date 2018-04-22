import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';
import { Timeline } from './models/timeline.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Aileron Airways';

  // register: Timeline[];
  // subscriber: Subscription;
  // loaded = false;

  constructor() { }

  public ngOnInit() {


  }
}
