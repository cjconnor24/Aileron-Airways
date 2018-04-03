import { Component, OnInit, Input } from '@angular/core';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';

@Component({
  selector: 'app-delete-timeline',
  templateUrl: './delete-timeline.component.html',
  styleUrls: ['./delete-timeline.component.scss']
})
export class DeleteTimelineComponent implements OnInit {

  timeline: Timeline;
  id: string;


  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  /**
   * Delete timeline and redirect to timelines main
   */
  onConfirmDelete() {
    this.registerService.deleteTimeline(this.timeline);
    this.router.navigate(['timelines']);
  }

  /**
   * Initialise the component and retrieve the Timeline to be deleted
   */
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log("The id is" + this.id);
    this.timeline = this.registerService.getTimeline(this.id);
  }

}
