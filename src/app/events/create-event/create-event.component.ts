import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Event } from '../../models/event.model';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';
import { TimelineEvent } from '../../models/timeline-event.model';
import { Timeline } from '../../models/timeline.model';
import { EventLocation } from '../../models/event-location';
import { HttpErrorResponse } from '@angular/common/http';
import { log } from 'util';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }




  // LOCALVARS FOR USAGE WITHIN COMPONENT
  createEvent: FormGroup;
  event: Event;
  editMode = false;
  updated = false;
  timelineId: string;
  subscription: Subscription;
  eventLocation: EventLocation;

  linkedLoaded: boolean = false;

  temp: boolean = false;

  currentTimeline: Timeline;
  currentEvent: TimelineEvent;
  currentEventId: string;

  now = new Date();





  /**
   * SUBMIT FORM FOR PROCESSING
   */
  onSubmit() {

    /**
     * IF CREATE NEW EVENT
     */
    if (!this.editMode) {

      this.eventLocation.name = this.createEvent.controls.location.value;

      const e = new TimelineEvent(
        this.createEvent.controls.title.value,
        this.createEvent.controls.description.value,
        new Date(this.createEvent.controls.datetime.value),
        this.eventLocation
      );

      const linkedId = this.createEvent.controls.linked.value;


      // console.log('THIS LINKED ID IS' + linkedId);
      // console.log('NEWLY CREATED ID IS ' + e.eventId);

      this.ideagenService.createEvent(this.timelineId, e, linkedId)
        .subscribe((data: any) => {

          console.log(data);

        },
          (error: any) => {
            console.log(error);
          },
          () => {
            this.router.navigate(['../../'], { relativeTo: this.route });
          });

    } else {

      // OTHERWISE EDIT

      this.currentEvent.title = this.createEvent.controls.title.value;
      this.currentEvent.dateTime = new Date(this.createEvent.controls.datetime.value);
      this.currentEvent.description = this.createEvent.controls.description.value;

      // LOCATION A NAME FRMO FORM
      this.eventLocation.name = this.createEvent.controls.location.value;

      this.currentEvent.location = this.eventLocation;



      this.ideagenService.editEvent(this.currentEvent)
        .subscribe((data: any) => {
          console.log(data);
        },
          (error: any) => {
            console.log(error);
          },
          () => {
            this.updated = true;
          });
    }
    
  }



  /**
   * Get event from map
   * @param event Event located on the map
   */
  getLocation(location: EventLocation) {
    this.eventLocation = location;
  }

  /**
   * Initialise the form
   */
  private initForm() {


    // CREATE TEMP DATA TO POPULATE THE FORM
    // TEST VARIABLE
    let eventName = '';
    let eventDateTime = '';
    let eventDescription = '';
    let eventLinkedEvents: TimelineEvent[];
    let eventAttachments = '';
    let eventLocation: EventLocation;

    // IF EDITING, PULL THROUGH THE CURRENT EVENT DETAILS
    if (this.editMode) {


      // this.createEvent = new FormGroup(controls{[]});

      this.ideagenService.getEvent(this.currentEventId)
        .subscribe((event: TimelineEvent) => {

          console.log('THIS IS EDIT EVENT CALL');
          console.log(event);

          this.currentEvent = event;

          eventName = this.currentEvent.title;
          eventDateTime = event.dateTime.toISOString();
          eventDescription = event.description;
          eventLinkedEvents = event.linkedEvents;
          // eventAttachments = event.attachments;
          eventLocation = event.location;

          // ALOS UPDATE THE GLOBAL EVENT OBJ
          this.eventLocation = event.location;


        },
          (error: HttpErrorResponse) => {
            console.log(error);
          },
          () => {
            console.log('this finished');
            console.log(this.currentEvent);
            this.temp = true;

            // THIS POPULATES THE ACTUAL FORM
            this.createEvent = new FormGroup({
              'title': new FormControl(eventName, Validators.required),
              'datetime': new FormControl(eventDateTime, Validators.required),
              'description': new FormControl(eventDescription, Validators.required),
              'location': new FormControl(eventLocation.name),
              'linked': new FormControl(eventLinkedEvents)
            });

          });

    } else {
      this.temp = true;

      // THIS POPULATES THE ACTUAL FORM
      this.createEvent = new FormGroup({
        'title': new FormControl(eventName, Validators.required),
        'datetime': new FormControl(eventDateTime, Validators.required),
        'description': new FormControl(eventDescription, Validators.required),
        'location': new FormControl(eventLocation),
        'linked': new FormControl(eventLinkedEvents)
      });

    }




  }



  /**
   * When initialising the component
   */
  ngOnInit() {

    console.log('THIS IS THE POINT THE COMPONENT IS RENDERED');


    // GET THE ID FROM THE URL AND SET THE UPDATE MODE TO TRUE IF PARAMS EXIST
    this.route.params.subscribe(
      (params: Params) => {

        // GET THE ROUTING PARAMETERS
        this.timelineId = params['id'];
        this.editMode = params['eventid'] != null;
        this.currentEventId = params['eventid'];

        // GET THE TIMELINES AND EVENTS FOR LINKED EVENTS DROPDOWN
        this.ideagenService.getTimelineAndEvents(this.timelineId)
          .subscribe((timeline: Timeline) => {

            // ASSIGN THE TIMELINE LOCALLY
            this.currentTimeline = timeline;

            // IF THERE ARE NO EVENTS, INITIALISE THE ARRAY
            if (this.currentTimeline.events == null) {
              this.currentTimeline.events = [];
            }

            // THIS WAS TRYING TO PULL THE CURRENT EVENT FROM THE ARRAY ABOVE
            // this.currentEvent = this.currentTimeline.events.find((tl: TimelineEvent) => {
            //   return tl.eventId === this.currentEventId
            // });

          },
            (error) => {
              console.log(error);
            },
            () => {

              // DISPLAY THE LINKED EVENT DROPDOWN ONCE LOADED
              this.linkedLoaded = true;

            });


        this.initForm();

      }
    );
  }



}
