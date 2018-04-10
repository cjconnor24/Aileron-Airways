import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Timeline } from '../../models/timeline.model';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';
// import { log } from 'util';
// import { Event } from '../../models/event.model';
// import { RegisterService } from '../../services/register.service';
// import { IdeagenService } from '../../services/ideagen.service';
// import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit, OnDestroy {

  register: Timeline[];
  subscriber: Subscription;
  searchText: string;
  loaded = false;


  constructor(private registerService: RegisterService, private ideagenService: IdeagenService) { }


  ngOnInit() {

    // // GET THE STATIC TIMELINES FROM THE SERVICE THEN LISTEN TO THE SUBJECT
    this.register = this.registerService.getTimelines();
    this.subscriber = this.registerService.registerChanged.subscribe(
      (timelines: Timeline[]) => {
        this.register = timelines;
        this.loaded = true;
      }
    );


  //   this.ideagenService.getTimelineAndEvents('105578').subscribe((data) => {
  //     // console.log('THIS IS INSIDE');

  //     console.log(data);
  //   },
  //   (error) => {
  //     console.log('There was an error');
  //   },
  //   () => {
  //     console.log("Done");
  //   }
  // )

//   this.ideagenService.getLinkedEvents('101134').subscribe((data) => {
//     // console.log('THIS IS INSIDE');

//     console.log(data);
//   },
//   (error) => {
//     console.log('There was an error');
//   },
//   () => {
//     console.log("Done");
//   }
// )

  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    // console.log('Register List Subscription Destroyed');
  }

}
