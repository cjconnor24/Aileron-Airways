import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Timeline } from '../../models/timeline.model';
import { IdeagenService } from '../../services/ideagen.service';

@Component({
  selector: 'app-timeline-overview',
  templateUrl: './timeline-overview.component.html',
  styleUrls: ['./timeline-overview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TimelineOverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private ideagenService: IdeagenService
  ) { }

  // LOCAL COMPONENT VARIABLES
  id: string;
  timeline: Timeline;
  loaded: boolean = false;

  ngOnInit() {

    // PULL DOWN THE EVENTS FROM THE API
    this.id = this.route.snapshot.params['id'];
    this.ideagenService.getTimelineAndEvents(this.id)
    .subscribe((data: Timeline) => {
      this.timeline = data;
      this.loaded = true;
    })

  }

}
