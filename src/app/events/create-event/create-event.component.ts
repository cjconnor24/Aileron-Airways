import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Event } from '../../models/event.model';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';
 
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private router:Router,
    private route:ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  createEvent: FormGroup;
  event: Event;
  editMode = false;
  updated = false;
  id: string;
  subscription: Subscription;

  onSubmit() {
    console.log(this.createEvent);
    if (!this.editMode) {
      console.log('EVENT ADDED');
      this.registerService.addEvent(new Event(this.createEvent.controls.name.value, this.createEvent.controls.dateTime.value, this.createEvent.controls.description.value, this.createEvent.controls.linkedEvents.value,  this.createEvent.controls.attachments.value, this.createEvent.controls.location.value));
    } else {
      console.log('EVENT EDITED');
      this.event.name = this.createEvent.controls.name.value;
      this.event.dateTime = this.createEvent.controls.dateTime.value;
      this.event.description = this.createEvent.controls.description.value;
      this.event.linkedEvents = this.createEvent.controls.linkedEvents.value;
      this.event.attachments = this.createEvent.controls.attachments.value;
      this.event.location = this.createEvent.controls.location.value;
      this.registerService.editEventName(this.event);
    }
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
      this.event = this.registerService.getEvent(this.id);
      eventName = this.event.name;
      eventDateTime = this.event.dateTime;
      eventDescription = this.event.description;
      eventLinkedEvents = this.event.linkedEvents;
      eventAttachments = this.event.attachments;
      eventLocation = this.event.location;
      
    }
    this.createEvent = new FormGroup({
      'name': new FormControl(eventName, Validators.required),
      'datetime': new FormControl(eventDateTime, Validators.required),
      'description': new FormControl(eventDescription, Validators.required),
      'location': new FormControl(eventLocation, Validators.required),
      'linked': new FormControl(eventLinkedEvents, Validators.required)
    });
  }

  ngOnInit() {
    // GET THE ID FROM THE URL AND SET THE UPDATE MODE TO TRUE IF PARAMS EXIST
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.event = this.registerService.getEvent(this.id);
        console.log(this.event);
        console.log(this.editMode);
        this.initForm();
      }
    );

    this.subscription = this.registerService.registerChanged.subscribe(
      (event: Event[]) => {
        this.updated = true;
      }
    );

  }

  

}
