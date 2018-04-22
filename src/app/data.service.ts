import {Injectable} from '@angular/core';
import { Timeline } from './models/timeline.model';
import { TimelineApiService } from './services/Timelineapi.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  lastId: number = 0;

  timeline: Timeline[] = [];

  constructor(
     private Timelineapi: TimelineApiService
   ) {}






}
