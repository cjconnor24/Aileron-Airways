import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent implements OnInit {

  constructor(private registerService: RegisterService, private router:Router, private route:ActivatedRoute, private ideagenService: IdeagenService) { }

  timelines = [
    { 1234: new Timeline('Timeline Name') },
    { 5678: new Timeline('Timeline Name') },
    { 9012: new Timeline('Timeline Name') }
  ];

  createTimeline: FormGroup;

  onCreateTimeline() {
    console.log(this.createTimeline.controls.name.value);
    this.ideagenService.createTimeline(new Timeline(this.createTimeline.controls.name.value));
    this.registerService.addTimeline(new Timeline(this.createTimeline.controls.name.value));
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  ngOnInit() {

    this.createTimeline = new FormGroup({
      'name': new FormControl(null, Validators.required)
    });

    console.log(this.createTimeline);

  }

}
