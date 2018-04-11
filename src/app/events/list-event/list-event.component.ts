import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IdeagenService } from '../../services/ideagen.service';
import { Timeline } from '../../models/timeline.model';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ListEventComponent implements OnInit {

  id: string; 
  timeline: Timeline;
  loaded: boolean = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    private ideagenService: IdeagenService
  ) { }

  ngOnInit() {

    console.log('LIST EVENT COMPONENT');

    this.route.params.subscribe(
      (params: Params) => {

        this.id = params['id'];
        console.log('EVENT IS');
        console.log(this.id);
        // this.editMode = params['id'] != null;
        // this.timeline = this.registerService.getTimeline(this.id);
        // console.log(this.timeline);
        // console.log(this.editMode);
        // this.initForm();

        this.ideagenService.getTimelineAndEvents(this.id)
        .subscribe((data:Timeline)=>{
          this.timeline = data;
          this.loaded = true;
          console.log(data);
          
        })

      }
    );

  }

}
