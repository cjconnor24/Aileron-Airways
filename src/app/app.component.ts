import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';
import { Timeline } from './models/timeline.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aileron Airways';

  // register: Timeline[];
  // subscriber: Subscription;
  // loaded = false;

  constructor() { }

  public ngOnInit() {

  //   this.register = this.registerService.getTimelines();
  //   this.subscriber = this.registerService.registerChanged.subscribe(
  //     (timelines: Timeline[]) => {
  //       this.register = timelines;
  //       this.loaded = true;
  //     }
  //   );
  }
}
