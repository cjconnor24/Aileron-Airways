import { Component, OnInit, Input } from '@angular/core';
import { Timeline } from '../../models/timeline.model';

@Component({
  selector: 'app-delete-timeline',
  templateUrl: './delete-timeline.component.html',
  styleUrls: ['./delete-timeline.component.scss']
})
export class DeleteTimelineComponent implements OnInit {

  @Input() timeline: Timeline;
  constructor() { }

  ngOnInit() {
  }

}
