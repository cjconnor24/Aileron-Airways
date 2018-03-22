import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';

@Injectable()
export class RegisterService {

  constructor() { }
  
  timelines: Timeline[];

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
