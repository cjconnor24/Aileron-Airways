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

  createEvent: FormGroup;
  event: Event;
  editMode = false;
  updated = false;
  timelineId: string;
  subscription: Subscription;
  eventLocation: EventLocation;

  linkedLoaded:boolean = false;

  currentTimeline: Timeline;

  onSubmit() {

    console.log(this.createEvent);
    if (!this.editMode) {

      this.eventLocation.name = this.createEvent.controls.location.value;
      
      const e = new TimelineEvent(
        this.createEvent.controls.title.value,
        this.createEvent.controls.description.value,
        new Date(this.createEvent.controls.datetime.value),
        this.eventLocation
      );

      const linkedId = this.createEvent.controls.linked.value;


      console.log('THIS LINKED ID IS' + linkedId);
      console.log('NEWLY CREATED ID IS ' + e.eventId);

      this.ideagenService.createEvent(this.timelineId, e, linkedId)
        .subscribe((data: any) => {

          console.log(data);

        },
          (error: any) => {
            console.log(error);
          },
          () => {
            this.router.navigate(['../']);
          });

    } else {
      console.log('EVENT EDITED');
      this.event.title = this.createEvent.controls.title.value;
      this.event.dateTime = this.createEvent.controls.dateTime.value;
      this.event.description = this.createEvent.controls.description.value;
      this.event.linkedEvents = this.createEvent.controls.linkedEvents.value;
      this.event.attachments = this.createEvent.controls.attachments.value;
      this.event.location = this.createEvent.controls.location.value;
      // this.registerService.editEvent(this.event);
    }
  }

  /**
   * Get event from map
   * @param event Event located on the map
   */
  getLocation(location: EventLocation) {
    this.eventLocation = location;
  }

  private initForm() {
    let eventName = '';
    let eventDateTime = '';
    let eventDescription = '';
    let eventLinkedEvents = '';
    let eventAttachments = '';
    let eventLocation = '';

    // IF EDITING, PULL THROUGH THE CURRENT EVENT DETAILS
    if (this.editMode) {
      // this.event = this.registerService.getEvent(this.id);
      // eventTitle = this.event.title;
      // eventDateTime = this.event.dateTime;
      // eventDescription = this.event.description;
      // eventLinkedEvents = this.event.linkedEvents;
      // eventAttachments = this.event.attachments;
      // eventLocation = this.event.location;
    }

    this.createEvent = new FormGroup({
      'title': new FormControl(eventName, Validators.required),
      'datetime': new FormControl(eventDateTime, Validators.required),
      'description': new FormControl(eventDescription, Validators.required),
      'location': new FormControl(eventLocation),
      'linked': new FormControl(eventLinkedEvents)
    });
  }

  ngOnInit() {
    // GET THE ID FROM THE URL AND SET THE UPDATE MODE TO TRUE IF PARAMS EXIST
    this.route.params.subscribe(
      (params: Params) => {
        this.timelineId = params['id'];
        this.editMode = params['eventid'] != null;

        console.log(params['eventid']);


        //TODO: FETCH EXISTING EVENT
        // this.event = this.registerService.getEvent(this.id);

        // GET THE TIMELINES AND EVENTS FOR LINKED EVENTS DROPDOWN
        this.ideagenService.getTimelineAndEvents(this.timelineId)
          .subscribe((timeline: Timeline) => {

            this.currentTimeline = timeline;

            // IF THERE ARE NO EVENTS, INITIALISE THE ARRAY
            if (this.currentTimeline.events == null) {
              this.currentTimeline.events = [];
            }

          },
            (error) => {
              console.log(error);
            },
            () => {
              this.linkedLoaded = true;
            });

        console.log(this.event);
        console.log(this.editMode);

        this.initForm();
      }
    );

    // this.subscription = this.registerService.registerChanged.subscribe(
    //   (event: Event[]) => {
    //     this.updated = true;
    //   }
    // );

  }



}
