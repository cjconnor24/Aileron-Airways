import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EventsAttachment, EventsAttachments } from '../data';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
const AToken = environment.authToken;
const Tenant = environment.tenantId;


@Injectable()
export class EventAttachmentApiService {

  constructor(private http: Http) { }

  public createAttachement() {
    console.log("create Attachment PUT TimelineEventId + AttachmentId + Title Req");
    let url = `${API_URL}TimelineEventAttachment/Create`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public editTitle() {
    console.log("create Event PUT AttachmentId + Title Req");
    let url = `${API_URL}TimelineEventAttachment/EditTitle`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public deleteAttachment() {
    console.log("create Event PUT AttachmentId Req");
    let url = `${API_URL}TimelineEventAttachment/Delete`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public getPresignedURL() {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'TimelineEventAttachment/GeneratePresignedURL', { headers: myHeaders })
      .map(response => {
        const timelineEvents = response.json();
        return timelineEvents.map((linkedtimeline) => new (timelineEvents));


      })
      .catch(this.handleError);
  }

  public getUploadPresignedURL() {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'TimelineEventAttachment/GenerateUploadPresignedURL', { headers: myHeaders })
      .map(response => {
        const timelineEvents = response.json();
        return timelineEvents.map((linkedtimeline) => new (timelineEvents));


      })
      .catch(this.handleError);
  }

  public getTimelineEventAttachement(): Observable<EventsAttachment[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'TimelineEventAttachment/GetAttachment', { headers: myHeaders })
      .map(response => {
        const eventsAttachment = response.json();
        return eventsAttachment.map((eventsAttachment) => new EventsAttachment(eventsAttachment));


      })
      .catch(this.handleError);
  }

  public getTimelineEventAttachements(): Observable<EventsAttachments[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'TimelineEventAttachment/GetAttachments', { headers: myHeaders })
      .map(response => {
        const eventsAttachments = response.json();
        return eventsAttachments.map((eventsAttachments) => new EventsAttachments(eventsAttachments));


      })
      .catch(this.handleError);
  }

  

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
