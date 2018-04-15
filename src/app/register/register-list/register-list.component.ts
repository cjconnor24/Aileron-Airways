import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Timeline } from '../../models/timeline.model';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';
// import { log } from 'util';
// import { Event } from '../../models/timeline-event.model';
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

    
    //this.registerEv = this.registerService.getAllEvent();
    //this.subscriber = this.registerService.registerChangeEv.subscribe((events:Event[]) =>{this.registerEv=events;})
    this.getEvents();
  
  }

  getEvents(){
    //this.ideagenSerivce.getTimelines();
   // this.ideagenSerivce.getAllEvent();
  }

  fetchData(){
    this.register = this.registerService.getTimelines();
  //  this.registerEv = this.registerService.getAllEvent();
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
    // console.log('Register List Subscription Destroyed');
  }

}
