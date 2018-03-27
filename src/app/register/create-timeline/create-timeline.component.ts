import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-create-timeline',
  templateUrl: './create-timeline.component.html',
  styleUrls: ['./create-timeline.component.scss']
})
export class CreateTimelineComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  createTimeline: FormGroup;
  timeline: Timeline;
  editMode = false;
  updated = false;
  id: string;

  subscription: Subscription;

  onSubmit() {

    console.log(this.createTimeline);

    if (!this.editMode) {
      console.log('TIMELINE ADDED');
      this.registerService.addTimeline(new Timeline(this.createTimeline.controls.name.value));
    } else {
      console.log('TIMELINE EDITED');
      this.timeline.title = this.createTimeline.controls.name.value;
      this.registerService.editTimelineTitle(this.timeline);
    }

  }

  private initForm() {

    let timelineTitle = '';

    // IF EDITING, PULL THROUGH THE NAME
    if (this.editMode) {
      this.timeline = this.registerService.getTimeline(this.id);
      timelineTitle = this.timeline.title;
    }

    this.createTimeline = new FormGroup({
      'name': new FormControl(timelineTitle, Validators.required)
    });
  }

  ngOnInit() {

    // GET THE ID FROM THE URL AND SET THE UPDATE MODE TO TRUE IF PARAMS EXIST
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.timeline = this.registerService.getTimeline(this.id);
        console.log(this.editMode);
        this.initForm();
      }
    );

    this.subscription = this.registerService.registerChanged.subscribe(
      (timeline: Timeline[]) => {
        this.updated = true;
      }
    );

  }

}
