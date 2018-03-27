import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { Event } from '../models/event.model';
import { Subject } from 'rxjs/Subject';
import { IdeagenService } from './ideagen.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RegisterService {

  constructor(private ideagenService: IdeagenService) { }

  // register: Timeline[] = [
  //   new Timeline('Chris Event'),
  //   new Timeline('Hardcoded Event')
  // ];
  // register: Observable<Timeline[]>;
  // registerEv: Event[];
  
  register: Timeline[] = [new Timeline('Chris Event')];
  registerChanged = new Subject<Timeline[]>();

  // oTimelines: Observable<Timeline[]>;
  // registerChangeEv = new Subject<Event[]>();

  private loadTimelines() {

    this.ideagenService.getTimelines()
    .subscribe(
      (timelines: Timeline[]) => {
        this.register = timelines;
        this.registerChanged.next(this.register.slice());

        console.log('LOADING TIMELINES FROM API:');
      },
      (error: any) => {
        console.log(error);
      }
);

  }

  getTimelines(): Timeline[] {
    this.loadTimelines();
    return this.register.slice();
  }

  getTimeline(id: string): Timeline {
    return this.register.find(timeline => timeline.timelineId === id);
  }

  deleteTimeline(timeline: Timeline) {
    // TODO: DELETE TIMELINE
    
    this.ideagenService.deleteTimeline(timeline).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error) => {
        console.log('There was an error with delete timeline:' + error);
      }
    );

    this.register.splice(this.register.indexOf(timeline), 1);
    this.registerChanged.next(this.register.slice());


  }

  // getAllEvent() {
  //   return this.registerEv.slice();
  // }

  setTimelines(timelines: Timeline[]) {
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }

  // setEvent(events: Event[]) {
  //   this.registerEv = events;
  //   this.registerChangeEv.next(this.registerEv.slice());
  // }

  // addEvent(event: Event) {
  //   this.registerEv.push(event);
  //   this.registerChangeEv.next(this.registerEv.slice());
  // }

  addTimeline(timeline: Timeline) {

    this.ideagenService.createTimeline(timeline).subscribe(
      (tline: Timeline) => {
        // console.log(data);
        this.register.push(tline);
        this.registerChanged.next(this.register.slice());
      },
      (error) => {
        console.log('There was an error creating timeline: ' + error);
      }
    );

    this.register.push(timeline);
    this.registerChanged.next(this.register.slice());
  }

  // updateTimeline(index: number, timeline: Timeline) {
  //   // TODO: UPDATE TIMELINE
  // }



}
