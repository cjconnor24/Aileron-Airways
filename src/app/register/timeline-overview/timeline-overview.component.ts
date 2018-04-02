import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Timeline } from '../../models/timeline.model';

@Component({
  selector: 'app-timeline-overview',
  templateUrl: './timeline-overview.component.html',
  styleUrls: ['./timeline-overview.component.scss']
})
export class TimelineOverviewComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService
  ) { }

  id: string;
  timeline: Timeline;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('The id is' + this.id);
    this.timeline = this.registerService.getTimeline(this.id);
    console.log(this.timeline);
  }

}
