import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Event } from '../models/event.model';
import 'rxjs/add/operator/map';


@Injectable()
export class IdeagenService {

  constructor(private httpClient: HttpClient, private registerService: RegisterService) { }

  API_URL = environment.apiUrl;

  getTimelines() {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    return this.httpClient.get(this.API_URL + 'Timeline/GetAllTimelinesAndEvent',
      {
        headers: headers
      }).map(
        data => {
          return data['Timelines'].map(timeline => {
            let tl = new Timeline(timeline.Title);
            tl.timelineId = timeline.Id;
            tl.dateCreated = new Date((timeline.CreationTimeStamp - 621355968000000000) / 10000);

             tl.events = timeline.TimelineEvents;

            return tl;
          });
        }
      )
      .subscribe(
        (timelines: Timeline[]) => {
          console.log(timelines);
          this.registerService.setTimelines(timelines);
          console.log(timelines);
        }
      );

    // SUBSCRIBE ELSEWHERE
    // .subscribe(
    //   (timelines: Timeline[]) => {
    //     this.registerService.setTimelines(timelines);
    //   }
    // )

  }

  public getAllEvent() {
    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      });

    return this.httpClient
      .get(this.API_URL + 'TimelineEvent/GetAllEvents', { headers: headers })
      .map(EvData => {
        console.log(EvData);
        return EvData.map(data => {

          let event = new Event(data.Id, data.Title, data.Description, data.EventDateTime, data.Location);

          return event;

        });
      })
      .subscribe(
        (events: Event[]) => {
          this.registerService.setEvent(events);
          console.log(events);
        })
  }
}



