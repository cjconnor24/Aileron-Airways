import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/event.model';
import { RegisterService } from './register.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
const AToken = environment.authToken;
const Tenant = environment.tenantId;

@Injectable()
export class EventApiService {


  constructor(private httpClient: HttpClient, private registerService: RegisterService) { }

  createEvent(event: Event) {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );
    console.log(event);
    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      EventId: 'eventid', // NEEDS AN ID
      Title: event.title,
      Description: event.description,
      location: event.location,
      dateTime: event.dateTime
    }
    console.log(body);
    return this.httpClient.put(API_URL + 'TimelineEvent/Create', body,
      {
        headers: headers
      }).subscribe(
        (data: any) => {
          console.log(data);
        }
      );
    }


      deleteEvent(event: Event) {

        const headers = new HttpHeaders(
          {
            'TenantId': 'Team2',
            'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
          }
        );
    
        console.log(event);
    
        const body = {
          'TenantId': 'Team2',
          'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
          EventId: event.eventId
        }
    
        console.log(body);
    
        return this.httpClient.put(API_URL + 'TimelineEvent/Delete', body,
          {
            headers: headers
          }).subscribe(
            (data: any) => {
              console.log(data);
    
              //this.registerService.deleteEvent(event);
    
    
            }
          );
    

  }

  // public editTitle() {
  //   console.log("edit Title PUT TimelineEventId + Title Req");
  //   let url = `${API_URL}TimelineEvent/EditTitle`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public editDescription() {
  //   console.log("edit Description PUT TimelineEventId + Desc Req");
  //   let url = `${API_URL}TimelineEvent/EditDescription`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public editLocation() {
  //   console.log("edit Location PUT TimelineEventId + Location Req");
  //   let url = `${API_URL}TimelineEvent/EditLocation`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public editEventDT() {
  //   console.log("edit Event Date Time (DT) PUT TimelineEventId + EventDateTime Req");
  //   let url = `${API_URL}EditEventDateTime`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public deleteEvent() {
  //   console.log("delete event PUT TimelineEventId Req");
  //   let url = `${API_URL}TimelineEvent/Delete`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public linkEvents() {
  //   console.log("Link Timeline events PUT TimelineEventId + LinkedToTimelineEventId Req");
  //   let url = `${API_URL}TimelineEvent/LinkEvents`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public unlinkEvents() {
  //   console.log("unlink events PUT TimelineEventId + UnlinkedFromTimelineEventId Req");
  //   let url = `${API_URL}TimelineEvent/UnlinkEvents`;
  //   let search = new URLSearchParams();
  //   //search.set();
  //   this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  // }

  // public getLinkedTimelineEvents(): Observable<LinkedTimeline[]> {

  //   let myHeaders = new Headers();
  //   myHeaders.append('TenantId', Tenant);
  //   myHeaders.append('AuthToken', AToken);
  //   return this.http
  //     .get(API_URL + 'TimelineEvent/GetLinkedTimelineEvents', { headers: myHeaders })
  //     .map(response => {
  //       const linkedtimeline = response.json();
  //       return linkedtimeline.map((linkedtimeline) => new LinkedTimeline(linkedtimeline));


  //     })
  //     .catch(this.handleError);
  // }

  // public getTimelineEvent(): Observable<TimelineEvent[]> {

  //   let myHeaders = new Headers();
  //   myHeaders.append('TenantId', Tenant);
  //   myHeaders.append('AuthToken', AToken);
  //   return this.http
  //     .get(API_URL + 'TimelineEvent/GetTimelineEvent', { headers: myHeaders })
  //     .map(response => {
  //       const timelineEvent = response.json();
  //       return timelineEvent.map((timelineEvent) => new TimelineEvent(timelineEvent));


  //     })
  //     .catch(this.handleError);
  // }

  
}
 