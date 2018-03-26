import {Injectable} from '@angular/core';
// import { Timeline } from './data';
import { TimelineApiService } from './Timelineapi.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {


  lastId: number = 0;

  timeline: Timeline[] = [];
  timelines: Timelines[] = [];

  constructor(
     private Timelineapi: TimelineApiService
   ) {
   }




   getAllData(): Observable<Timelines[]> {
     return this.Timelineapi.getTimelines();
   }



}

export class Timelines {
  id: number;
  title: String = '';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
  export class Timeline {
    id: number;
    title: String = '';
    complete: boolean = false;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}
