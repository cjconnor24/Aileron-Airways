import { Component, OnInit, Input } from '@angular/core';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-timeline',
  templateUrl: './delete-timeline.component.html',
  styleUrls: ['./delete-timeline.component.scss']
})
export class DeleteTimelineComponent implements OnInit {

  timeline: Timeline;
  id: number;
  constructor(private registerService: RegisterService, private router: Router, private route: ActivatedRoute) { }

  // TODO: FILTER THE LIST TO GET THE ID

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.timeline = this.registerService.getTimelines().pop();
  }

}
