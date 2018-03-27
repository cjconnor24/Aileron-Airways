import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/observable/of';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';



@Injectable()
export class IdeagenService {

  constructor(private httpClient: HttpClient) { }

  API_URL = environment.apiUrl;

  createTimeline(timeline: Timeline): Observable<Timeline> {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    console.log(timeline);

    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      TimelineId: timeline.timelineId, // NEEDS AN ID
      Title: timeline.title
    };

    return this.httpClient.put(this.API_URL + 'Timeline/Create', body,
      {
        headers: headers
      }).map(
        (data: {Title: string, CreationTimeStamp: string, IsDeleted: boolean, Id: string, TenantId: string}) => {
        const tline: Timeline =  new Timeline(data.Title);
        tline.dateCreated = new Date(); //TODO: CONVERT TO PROPER TIME STAMP
        return tline;
        // return data;
      });

  }

  deleteTimeline(timeline: Timeline) {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      TimelineId: timeline.timelineId
    };

    return this.httpClient.put(this.API_URL + 'Timeline/Delete', body,
      {
        headers: headers
      });

  }


  getTimelines(): Observable<Timeline[]> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
    });

    return this.httpClient.get(this.API_URL + 'Timeline/GetAllTimelinesAndEvent',
      {
        headers: headers
      }).map(
        data => {
          return data['Timelines'].map(timeline => {

            const tl = new Timeline(timeline.Title);
            tl.timelineId = timeline.Id;
            tl.dateCreated = new Date((timeline.CreationTimeStamp - 621355968000000000) / 10000);

            // GET THE EVENTS AND MAP TO EVENT OBJECTS
            tl.events = timeline['TimelineEvents'].map(event => {
              const e: Event = new Event(event.Id, event.Title, event.Description, event.EventDateTime, event.Location);
              return e;
            });

            return tl;
          });
        }
      );

  }
}
// COMMENTED THE BELOW OUT AS WE SHOULDNT NEED IT, NOW THAT WE'RE MAPPING EVENTS DIRECTLY IN GETALLTIMELINEEVENTS
//   public getAllEvents() {
//     const headers = new HttpHeaders(
//       {
//         'TenantId': 'Team2',
//         'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
//       });

//     return this.httpClient
//       .get(this.API_URL + 'TimelineEvent/GetAllEvents', { headers: headers })
//       .map(EvData => {
//         console.log(EvData);
//         return EvData.map(data => {

//           let event = new Event(data.Id, data.Title, data.Description, data.EventDateTime, data.Location);

//           return event;

//         });
//       })
//       .subscribe(
//         (events: Event[]) => {
//           this.registerService.setEvent(events);
//           console.log(events);
//         })
//   }
// }



