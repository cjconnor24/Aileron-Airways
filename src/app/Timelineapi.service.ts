import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Timelines, Timeline, AllTimelineEvents } from './data';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;
const AToken = environment.AToken;
const Tenant = environment.Tenant;

@Injectable()
export class TimelineApiService {

  constructor(private http: Http) {

  }

  public getTimeline(): Observable<Timeline[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'Timeline/GetTimeline', { headers: myHeaders })
      .map(response => {
        const timeline = response.json();
        return timeline.map((timeline) => new Timeline(timeline));


      })
      .catch(this.handleError);
  }

  public getTimelineEvents(): Observable<AllTimelineEvents[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'Timeline/GetAllTimelinesAndEvent', { headers: myHeaders })
      .map(response => {
        const timelineEvents = response.json();
        return timelineEvents.map((timelineEvents) => new AllTimelineEvents(timelineEvents));


      })
      .catch(this.handleError);
  }

  public getTimelines(): Observable<Timelines[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', Tenant);
    myHeaders.append('AuthToken', AToken);
    return this.http
      .get(API_URL + 'Timeline/GetTimelines', { headers: myHeaders })
      .map(response => {
        const data = response.json();
        return data.map((data) => new Timelines(data));


      })
      .catch(this.handleError);
  }

  public createTimeline() {
    console.log("create timeline PUT TimelineID + Title Req");
    let url = `${API_URL}/Timeline/Create`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public editTitle() {
    console.log("edit timeline title PUT TimelineId + Title req");
    let url = `${API_URL}/Timeline/EditTitle`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public deleteTimeline() {
    console.log("delete timeline PUT TimelineId Req");
    let url = `${API_URL}/Timeline/Delete`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public linkEvent() {
    console.log("link event PUT TimelineID + TimelineEvent Req");
    let url = `${API_URL}/Timeline/LinkEvent`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public unlinkEvent() {
    console.log("unlink event PUT TimelineID + TimelineEvent Req");
    let url = `${API_URL}/Timeline/UnlinkEvent`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  public getLinkedEvent() {
    console.log("get linked event PUT TimelineID Req");
    let url = `${API_URL}/Timeline/GetEvents`;
    let search = new URLSearchParams();
    //search.set();
    this.http.put(url, { id: Tenant, AuthToken: AToken }, { search }).subscribe(res => console.log(res.json()));
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
