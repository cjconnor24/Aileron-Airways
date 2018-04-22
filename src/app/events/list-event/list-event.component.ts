import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Timeline } from '../../models/timeline.model';
import { TimelineEvent } from '../../models/timeline-event.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListEventComponent implements OnInit {

  // LOCAL VARIABLES FOR COMPONENT
  id: string;
  timeline: Timeline;
  loaded: boolean = false;
  hasEvents: boolean;
  error: HttpErrorResponse;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  /**
   * Event handler on click to delete
   * @param eventId Event ID to be deleted
   */
  onDeleteEvent(eventId: string):void {


    // CALL THE API AND DELETE THE EVENT
    this.ideagenService.deleteEvent(this.timeline.timelineId, eventId)
      .subscribe((data: any) => {

        // REMOVE FROM TIMELINE OBJECT IN COMPONENET;
        this.timeline.events = this.timeline.events.filter((x) => {
          return x.eventId !== eventId
        });

      });

  }

  ngOnInit() {

    // GET THE ID FROM THE ROUTE
    this.route.params.subscribe(
      (params: Params) => {

        this.id = params['id'];

        // GET THE TIMELINE AND EVENTS FROM THE API
        this.ideagenService.getTimelineAndEvents(this.id)
          .subscribe((data: Timeline) => {
            this.timeline = data;
            
            this.hasEvents = (data.events.length > 0);
            console.log(data);
            this.loaded = true;
            console.log(JSON.stringify(data));

          },
        (error: HttpErrorResponse) => {
          this.error = error;
        })}
    );

  }

}
