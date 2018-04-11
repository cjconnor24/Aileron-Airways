import { Injectable } from '@angular/core';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { Event } from '../models/event.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { log } from 'util';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';


const API_URL = environment.apiUrl;
const AToken = environment.authToken;
const Tenant = environment.tenantId;

@Injectable()
export class EventApiService {


  constructor(private httpClient: HttpClient) { }

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


  deleteEvent(event: Event): Observable<any> {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      EventId: event.eventId
    };

    return this.httpClient.put(API_URL + 'Timeline/Delete', body,
      {
        headers: headers
      });

  }

  getEvent(): Observable<Event> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
    });

    return this.httpClient.get(API_URL + 'TimelineEvent/GetTimelineEvents',
      {
        headers: headers
      }).map((data: { Title: string, dateTime: string, Description: string, IsDeleted: string, Location: number, eventId: string }) => {
        const e: Event = new Event( data.Title, data.dateTime, data.Description, data.Location,data.eventId);

        return e;
      });

  }

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


