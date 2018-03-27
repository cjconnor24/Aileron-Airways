import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';

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
  id:string;

  onSubmit() {

    if (!this.editMode) {
      this.registerService.addTimeline(new Timeline(this.createTimeline.controls.name.value));
      this.router.navigate(['../'], { relativeTo: this.route });

    } else {

    }

  }

  initForm() {

  }

  ngOnInit() {

    let timelineName = '';

    // SUBSCRIBE TO GET THE RECIPE
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        // this.initForm();
      }

          
      if(this.editMode){
        this.timeline = this.registerService.getTimeline(this.id);
        timelineName = this.timeline.title;
      }

    this.createTimeline = new FormGroup({
        'name': new FormControl(timelineName, Validators.required)
      });

    console.log(this.createTimeline);

  }

}
