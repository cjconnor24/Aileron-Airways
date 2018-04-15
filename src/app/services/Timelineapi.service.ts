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

  public getAllTimelinesAndEvent() {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      });

    return this.httpClient
      .get(API_URL + 'Timeline/GetAllTimelinesAndEvent', { headers: headers })
      .map(eventObj => {
        return eventObj['Events'].map(event=>{
          let eVent = new TimelineEvent(event.title,event.description,event.location,event.dateTime, event.id);
          eVent.title = event.title;
          eVent.description = event.description;
          eVent.location = event.location;
          eVent.dateTime = event.dateTime;
          console.log(Event);
          console.log(event);
          console.log(eVent);
          return eVent;
        });
      }) 
    }
  

    

//   public getTimelines(): Observable<Timeline[]> {

//     let myHeaders = new Headers();
//     myHeaders.append('TenantId', Tenant);
//     myHeaders.append('AuthToken', AToken);
//     return this.http
//       .get(API_URL + 'Timeline/GetTimelines', { headers: myHeaders })
//       .map(response => {
//         const data = response.json();
//         return data.map((data) => new Timelines(data));


//       })
//       .catch(this.handleError);
//   }

//   public createTimeline() {
//     console.log("create timeline PUT TimelineID + Title Req");
//     let url = `${API_URL}/Timeline/Create`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   public editTitle() {
//     console.log("edit timeline title PUT TimelineId + Title req");
//     let url = `${API_URL}/Timeline/EditTitle`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   public deleteTimeline() {
//     console.log("delete timeline PUT TimelineId Req");
//     let url = `${API_URL}/Timeline/Delete`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   public linkEvent() {
//     console.log("link event PUT TimelineID + TimelineEvent Req");
//     let url = `${API_URL}/Timeline/LinkEvent`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   public unlinkEvent() {
//     console.log("unlink event PUT TimelineID + TimelineEvent Req");
//     let url = `${API_URL}/Timeline/UnlinkEvent`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   public getLinkedEvent() {
//     console.log("get linked event PUT TimelineID Req");
//     let url = `${API_URL}/Timeline/GetEvents`;
//     let search = new URLSearchParams();
//     //search.set();
//     this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
//   }

//   private handleError(error: Response | any) {
//     console.error('ApiService::handleError', error);
//     return Observable.throw(error);
//   }
  }