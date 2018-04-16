import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Timeline } from '../../models/timeline.model';
import { TimelineEvent } from '../../models/timeline-event.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListEventComponent implements OnInit {

  id: string;
  timeline: Timeline;
  loaded: boolean = false;
  hasEvents: boolean;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  // createTestEvent() {

  //   const event: TimelineEvent = new TimelineEvent('Title', 'Description', new Date(), 'test location');

  //   this.ideagenService.createEvent(this.id, event)
  //     .subscribe((data: any) => {



  //     },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         this.timeline.events.push(event);
  //       }
  //     );



  // }


  onDeleteEvent(eventId: string) {


    this.ideagenService.deleteEvent(this.timeline.timelineId, eventId)
      .subscribe((data: any) => {

        console.log("SHOULD BE DELETED NOW :)");
        console.log(data);

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
        // this.editMode = params['id'] != null;
        // this.timeline = this.registerService.getTimeline(this.id);
        // console.log(this.timeline);
        // console.log(this.editMode);
        // this.initForm();

        // GET THE TIMELINE AND EVENTS FROM THE API
        this.ideagenService.getTimelineAndEvents(this.id)
          .subscribe((data: Timeline) => {
            this.timeline = data;
            this.loaded = true;
            this.hasEvents = (data.events.length > 0);
            console.log(data);

            console.log(JSON.stringify(data));

          })

      }
    );

  }

}
