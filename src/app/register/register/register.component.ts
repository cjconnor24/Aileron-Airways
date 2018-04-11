import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdeagenService } from '../../services/ideagen.service';
import { RegisterService } from '../../services/register.service';
import { Subscription } from 'rxjs/Subscription';
import { Timeline } from '../../models/timeline.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // register: Timeline[];
  // subscriber: Subscription;
  // searchText: string;
  // loaded = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
 
    // GET THE STATIC TIMELINES FROM THE SERVICE THEN LISTEN TO THE SUBJECT
    // COMMENTED OUT WHILE I"M WORKING ON BUILDING THE OTHER TIMELINE OVERVIEW
    // TODO: RE-COMMENT BACK IN
    // this.register = this.registerService.getTimelines();
    // this.subscriber = this.registerService.registerChanged.subscribe(
    //   (timelines: Timeline[]) => {
    //     this.register = timelines;
    //     // this.loaded = true;
    //   }
    // );
  }

  ngOnDestroy() {
    // this.subscriber.unsubscribe();
    // console.log('Register List Subscription Destroyed');
  }

}
