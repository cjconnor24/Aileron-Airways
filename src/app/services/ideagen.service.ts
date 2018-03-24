import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
            tl.dateCreated = timeline.CreationTimeStamp;

            return tl;
          });
        }

      );

      // SUBSCRIBE ELSEWHERE
      // .subscribe(
      //   (timelines: Timeline[]) => {
      //     this.registerService.setTimelines(timelines);
      //   }
      // )

  }

}

