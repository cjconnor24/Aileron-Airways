import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RegisterService {

  constructor() { }
  
    register: Timeline[] = [
      new Timeline('Flight 101'),
      new Timeline('Flight 202'),
      new Timeline('Flight 907'),
    ]

    registerChanged = new Subject<Timeline[]>();

  getTimelines(){
    return this.register.slice();
  }

  setTimelines(timelines: Timeline[]){
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }

  addTimeline(timeline: Timeline){
    // TODO: ADD TIMELINE
  }

  updateTimeline(){
    //TODO: UPDATE TIMELINE
  }

  deleteTimeline(){
    //TODO: DELETE TIMELINE
  }

}
