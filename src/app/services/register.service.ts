import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RegisterService {

  constructor() { }

  register: Timeline[] = [
    new Timeline('Chris Event'),
    new Timeline('Hardcoded Event')
  ];

  registerChanged = new Subject<Timeline[]>();

  getTimelines() {
    return this.register.slice();
  }

  setTimelines(timelines: Timeline[]) {
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }

  addTimeline(timeline: Timeline) {
    this.register.push(timeline);
    this.registerChanged.next(this.register.slice());
  }

  updateTimeline(index:number, timeline: Timeline) {
    
    //TODO: UPDATE TIMELINE


  }

  deleteTimeline() {
    //TODO: DELETE TIMELINE
  }

}