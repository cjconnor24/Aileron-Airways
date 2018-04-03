import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {

  constructor(private registerService: RegisterService, private router:Router, private route:ActivatedRoute, private ideagenService: IdeagenService) { }

  // dont really understand the purpose of this
  events = [
    { 4321: new Event('Event Name','Event Date','Event Description','Related Events','Event Attachment','Event Location') },
    { 8765: new Event('Event Name','Event Date','Event Description','Related Events','Event Attachment','Event Location') },
    { 2109: new Event('Event Name','Event Date','Event Description','Related Events','Event Attachment','Event Location') }
  ];  

  createEvent: FormGroup;

  onCreateEvent() {
    console.log(this.createEvent.controls.name.value);
    this.registerService.addEvent(new Event(this.createEvent.controls.name.value, this.createEvent.controls.date.value, this.createEvent.controls.description.value, this.createEvent.controls.events.value, this.createEvent.controls.attachments.value, this.createEvent.controls.location.value));
    this.ideagenService.createEvent(new Event(this.createEvent.controls.name.value, this.createEvent.controls.date.value, this.createEvent.controls.description.value, this.createEvent.controls.events.value, this.createEvent.controls.attachments.value, this.createEvent.controls.location.value));  
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  ngOnInit() {
    this.createEvent = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    console.log(this.createEvent);
  }

}
