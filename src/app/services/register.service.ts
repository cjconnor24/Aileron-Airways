import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';

@Injectable()
export class RegisterService {

  constructor() { }
  
    register: Timeline[] = [
      new Timeline('Flight 101'),
      new Timeline('Flight 202'),
      new Timeline('Flight 907'),
    ]

  getTimelines(){
    return this.register.slice();
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
