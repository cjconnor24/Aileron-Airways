import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { Event } from '../models/event.model';
import { Subject } from 'rxjs/Subject';
import { IdeagenService } from './ideagen.service';

@Injectable()
export class RegisterService {

  constructor() { }

  register: Timeline[] = [
    new Timeline('Chris Event'),
    new Timeline('Hardcoded Event')
  ];

  registerEv: Event[];

  registerChanged = new Subject<Timeline[]>();
  registerChangeEv = new Subject<Event[]>();

  getTimelines() {
    return this.register.slice();
  }

  getTimeline(id: string): Timeline  {
    return this.register.find(timeline => timeline.timelineId === id);
  }

  deleteTimeline(timeline: Timeline) {
    // TODO: DELETE TIMELINE
    // this.register;
    this.register.splice(this.register.indexOf(timeline), 1);
    this.registerChanged.next(this.register.slice());


  }

  getAllEvent(){
    return this.registerEv.slice();
  }

  setTimelines(timelines: Timeline[]) {
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }

  setEvent(events: Event[]) {
    this.registerEv = events;
    this.registerChangeEv.next(this.registerEv.slice());
  }

  addEvent(event: Event){
    this.registerEv.push(event);
    this.registerChangeEv.next(this.registerEv.slice());
  }

  addTimeline(timeline: Timeline) {
    this.register.push(timeline);
    this.registerChanged.next(this.register.slice());
  }

  updateTimeline(index: number, timeline: Timeline) {
    
    // TODO: UPDATE TIMELINE


  }



}
