import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/Observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Timeline } from '../models/timeline.model';
import { IdeagenService } from '../services/ideagen.service';

@Component({
  selector: 'app-timeline-search',
  templateUrl: './timeline-search.component.html',
  styleUrls: ['./timeline-search.component.css']
})
export class TimelineSearchComponent implements OnInit {


  ngOnInit() {
  }

}
