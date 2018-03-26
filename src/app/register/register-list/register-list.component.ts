import { Component, OnInit, OnDestroy } from '@angular/core';
import { Timeline } from '../../models/timeline.model';
import { Event } from '../../models/event.model';
import { RegisterService } from '../../services/register.service';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit, OnDestroy {

  register: Timeline[];
  registerEv: Event[];
  subscriber: Subscription;


  constructor(private registerService: RegisterService,private ideagenSerivce:IdeagenService) { }

  ngOnInit() {

    // THIS WILL CURRENTLY GET THE STATIC TIMELINES FROM THE SERVICE
   
    this.register = this.registerService.getTimelines();
    this.subscriber = this.registerService.registerChanged.subscribe(
      (timelines: Timeline[]) => {
        this.register = timelines;
      }

    )
    //this.registerEv = this.registerService.getAllEvent();
    //this.subscriber = this.registerService.registerChangeEv.subscribe((events:Event[]) =>{this.registerEv=events;})
    this.getEvents();
  
  }

  getEvents(){
    this.ideagenSerivce.getTimelines();
    this.ideagenSerivce.getAllEvent();
  }

  fetchData(){
    this.register = this.registerService.getTimelines();
    this.registerEv = this.registerService.getAllEvent();
  }

  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }

}
