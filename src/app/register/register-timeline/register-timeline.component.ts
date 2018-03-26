import { Component, OnInit, Input } from '@angular/core';
import { Timeline } from '../../models/timeline.model';

@Component({
  selector: 'app-register-timeline',
  templateUrl: './register-timeline.component.html',
  styleUrls: ['./register-timeline.component.scss']
})
export class RegisterTimelineComponent implements OnInit {

  constructor() { }

  @Input() timeline: Timeline;

  ngOnInit() {
  }

}
