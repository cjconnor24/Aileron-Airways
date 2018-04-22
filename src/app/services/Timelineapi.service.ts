import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Timeline } from '../models/timeline.model';
import { TimelineEvent } from '../models/timeline-event.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
const AToken = environment.authToken;
const Tenant = environment.tenantId;

@Injectable()
export class TimelineApiService {


  constructor(private httpClient: HttpClient) {

  }

  public getTimeline() {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      });

    return this.httpClient
      .get(API_URL + 'Timeline/GetTimeline', { headers: headers })
      .map(
        data => {
          return data['Timelines'].map(timeline => {
            let tl = new Timeline(timeline.Title);
            tl.timelineId = timeline.Id;
            tl.dateCreated = new Date((timeline.CreationTimeStamp-621355968000000000)/10000);
            
             tl.events = timeline.TimelineEvents;

            return tl;
          });
     
        })}

  }