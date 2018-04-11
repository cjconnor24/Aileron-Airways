import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { Event } from '../models/event.model';
import { Subject } from 'rxjs/Subject';
import { IdeagenService } from './ideagen.service';
import { Observable } from 'rxjs/Observable';
import { EventApiService } from './event-api.service';
import { EventAttachmentApiService } from './event-attachment-api.service';



@Injectable()
export class RegisterService {

  constructor(private ideagenService: IdeagenService) { }

  register: Timeline[] = [];
  registerChanged = new Subject<Timeline[]>();
  
  registerChangedEv = new Subject<Event[]>();
  registerEv: Event;





  private loadTimelines() {

    this.ideagenService.getTimelines()
      .subscribe(
        (timelines: Timeline[]) => {
          this.register = timelines;
          this.registerChanged.next(this.register.slice());
          // console.log('LOADING TIMELINES FROM API:');
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

 

  editTimelineTitle(timeline: Timeline) {
    this.ideagenService.editTimelineTitle(timeline)
    .subscribe(
      (tline: Timeline) => {
        this.register[this.register.indexOf(tline)] = tline;
        this.registerChanged.next(this.register.slice());
      },
      (error) => {
        console.log(error);
      }
    );

  }


  /**
   * Subscribes to the API call in IdeaGen service waiting on the API response call to delete.
   * Returns the reponse text from API.
   * @param timeline Timeline to delete
   */
  deleteTimeline(timeline: Timeline) {

    this.ideagenService.deleteTimeline(timeline).subscribe(
      (data: any) => {
        console.log(data);
        console.log(this.register.splice(this.register.indexOf(timeline), 1));
        this.registerChanged.next(this.register.slice());
      },
      (error) => {
        console.log('There was an error with delete timeline:' + error);
      }
    );

  }

  // deleteEvent(event: Event) {

  //   this.EventApiService.deleteEvent(event).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       console.log(this.registerEv.splice(this.registerEv.indexOf(event), 1));
  //       this.registerChangedEv.next(this.registerEv.slice());
  //     },
  //     (error) => {
  //       console.log('There was an error with delete Event:' + error);
  //     }
  //   );

  // }

  setTimelines(timelines: Timeline[]) {
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }



  
  addTimeline(timeline: Timeline) {

    // SUBSCRIBE AND WAIT FOR RESPONSE
    this.ideagenService.createTimeline(timeline).subscribe(
      (tline: Timeline) => {
        // PUSH TO THE REGISTER A FORCE OUT TO SUBJECT
        this.register.push(tline);
        this.registerChanged.next(this.register.slice());
      },
      (error) => {
        console.log('There was an error creating timeline: ' + error);
      }
    );

    // this.register.push(timeline);
    // this.registerChanged.next(this.register.slice());
  }



}
