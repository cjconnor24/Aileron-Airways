import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { TimelineEvent } from '../models/timeline-event.model';
import { Subject } from 'rxjs/Subject';
import { IdeagenService } from './ideagen.service';
import { Observable } from 'rxjs/Observable';
import { EventAttachmentApiService } from './event-attachment-api.service';



@Injectable()
/**
 * Register service to handle all register interactions.
 */
export class RegisterService {

  constructor(private ideagenService: IdeagenService) { }

  // LOCAL VARIABLES FOR SERVICE
  register: Timeline[] = [];
  registerChanged = new Subject<Timeline[]>();
  registerChangedEv = new Subject<TimelineEvent[]>();
  registerEv: TimelineEvent;

  /**
   * load all timelines into the register
   */
  private loadTimelines():void {

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


  /**
   * Sort the register of timelines.
   */
  private sortRegister(): void{

      let sortedData = []
      sortedData = this.register.slice().sort((a: any, b: any) => a.dateCreated - b.dateCreated);
      
  }



  /**
   * Get all the timelines.
   */
  getTimelines(): Timeline[] {
    this.loadTimelines();
    // this.sortRegister();
    return this.register.slice();
  }

  /**
   * Retrieve a timeline with a specific ID
   * @param id ID of timeline to retrieve
   */
  getTimeline(id: string): Timeline {

    return this.register.find(timeline => timeline.timelineId === id);
  }

 

  /**
   * Edit the timeline title.
   * @param timeline Timeline to edit
   */
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

  /**
   * Add timelines to the register
   * @param timelines Array of timelines to add to the register
   */
  setTimelines(timelines: Timeline[]) {
    this.register = timelines;
    this.registerChanged.next(this.register.slice());
  }



  /**
   * Add a timeline to the register
   * @param timeline Timeline to be added
   */
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

  }



}
