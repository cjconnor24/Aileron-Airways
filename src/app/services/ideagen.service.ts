import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { Event } from '../models/event.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class IdeagenService {

  /**
   * Constructor 
   * @param httpClient HttpClient Service
   */
  constructor(private httpClient: HttpClient) { }

  API_URL = environment.apiUrl;
  API_AUTH = {
    'TenantId': 'Team2',
    'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
  }

  /**
   * Create timeline and save it in API
   * @param timeline Timeline to create in API
   */
  createTimeline(timeline: Timeline): Observable<Timeline> {

    const headers = new HttpHeaders(
      this.API_AUTH
    );
    console.log(timeline);
    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      TimelineId: timeline.timelineId, // NEEDS AN ID
      Title: timeline.title
    };
    console.log(body);
    return this.httpClient.put(this.API_URL + 'Timeline/Create', body,
      {
        headers: headers
      }).map(
        (data: { Title: string, CreationTimeStamp: string, IsDeleted: boolean, Id: string, TenantId: string }) => {
          const tline: Timeline = new Timeline(data.Title);
          tline.dateCreated = this.ticksToTime(data.CreationTimeStamp);
          return tline;
          // return data;
        });

  }

  /**
   * Update the timeline used on the passed timeline
   * @param timeline The timeline to be updated
   */
  editTimelineTitle(timeline: Timeline): Observable<Timeline> {

    const headers = new HttpHeaders(
      {
        'TenantId': 'Team2',
        'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    // console.log(timeline);

    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      TimelineId: timeline.timelineId, // NEEDS AN ID
      Title: timeline.title
    };

    return this.httpClient.put(this.API_URL + 'Timeline/EditTitle', body,
      {
        headers: headers
      }).map(
        (data: {
          Title: string,
          CreationTimeStamp: string,
          IsDeleted: boolean,
          Id: string,
          TenantId: string
        }) => {
          const tline: Timeline = new Timeline(data.Title);
          tline.dateCreated = this.ticksToTime(data.CreationTimeStamp);
          return tline;
          // return data;
        });
  }

  /**
   * Remove timeline from API
   * @param timeline Timeline to remove
   */
  deleteTimeline(timeline: Timeline): Observable<any> {

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

  /**
   * Get timeline based on passed timeline
   * @param timeline Timeline get get from API
   */
  getTimeline(timeline: Timeline): Observable<Timeline> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
    });

    return this.httpClient.get(this.API_URL + 'Timeline/GetTimeline',
      {
        headers: headers
      }
    )
      .map(
        (data: {
          Title: string,
          CreationTimeStamp: string,
          IsDeleted: string,
          Id: string,
          TenantId: string
        }
        ) => {
          const tl: Timeline = new Timeline(data.Title);
          tl.dateCreated = this.ticksToTime(data.CreationTimeStamp); // TODO: CONVERT DATE
          return tl;
        });
  }


  /**
   * Get timeline using the timeline ID
   * @param timelineId Timeline ID to retrieve
   */
  getTimelineById(timelineId: string): Observable<Timeline> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      'TimelineId': timelineId
    });

    return this.httpClient.get(this.API_URL + 'Timeline/GetTimeline',
      {
        headers: headers
      }
    )
      .map(
        (data: {
          Title: string,
          CreationTimeStamp: string,
          IsDeleted: string,
          Id: string,
          TenantId: string
        }
        ) => {
          const tl: Timeline = new Timeline(data.Title);
          tl.dateCreated = this.ticksToTime(data.CreationTimeStamp); // TODO: CONVERT DATE
          return tl;
        });
  }


  /**
   * Get all timelines and events
   */
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
            tl.dateCreated = this.ticksToTime(+timeline.CreationTimeStamp);

            // GET THE EVENTS AND MAP TO EVENT OBJECTS
            tl.events = timeline['TimelineEvents'].map(event => {

              const e: Event = new Event(event.Id, event.Title, event.Description, this.ticksToTime(event.EventDateTime), event.Location);
              return e;
              // console.log(e);

            });

            return tl;
          });
        }
      );
  }

  /**
 * Get timeline based on passed timeline
 * @param timeline Timeline get get from API
 */
  getEvent(eventId: string): Observable<Event> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      'TimelineEventId': eventId
    });

    return this.httpClient.get(this.API_URL + 'TimelineEvent/GetTimelineEvent',
      {
        headers: headers
      }).map((data: {
        Title: string,
        EventDateTime: string,
        Description: string,
        IsDeleted: boolean,
        Location: string,
        Id: string,
        TenantId: string
      }) => {
        const event: Event = new Event(data.Id, data.Title, data.Description, this.ticksToTime(data.EventDateTime), data.Location);
        return event;
      });
  }


  /**
   * This will only return the intermediate Event id's
   * @param timelineId Id of the timeline to check.
   */
  private getEventsByTimelineId(timelineId: string): Observable<any> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      'TimelineId': timelineId
    });

    return this.httpClient.get(this.API_URL + 'Timeline/GetEvents', { headers: headers });

  }

  /**
   * Get all linked events for specific event id.
   * @param eventId Event ID to check
   */
  getLinkedEvents(eventId: string): Observable<any> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
    });

    return this.httpClient.get(this.API_URL + 'TimelineEvent/GetLinkedTimelineEvents', { headers: headers.append('TimelineEventId', eventId) })
      .flatMap((links: any) => {

        return Observable.forkJoin(
          links.map((data: any) => {
            return this.getEvent(data.TimelineEventId);
          })
        )

        // return this.getEvent(links);
        // return links.LinkedToTimelineEventId;

      });
  }

  /**
   * Get timeline and event ID's using paralell HttpClient
   * @param timelineId
   */
  getTimelineAndEventsParallel(timelineId: string): Observable<any> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
    });

    // RUN BOTH QUERIES IN PARALELL [0] GET TIMELINE [1] GET EVENTS
    return Observable.forkJoin([
      this.httpClient.get(this.API_URL + 'Timeline/GetTimeline', { headers: headers.append('TimelineId', timelineId) }),
      this.httpClient.get(this.API_URL + 'Timeline/GetEvents', { headers: headers.append('TimelineId', timelineId) })
    ])
      .map((data: any[]) => {
        let timeline: any = data[0]; // TIMELINE
        let events: any = data[1]; // THE EVENTS

        timeline.Events = events; // ADD THEM TO THAT OBJECT
        return timeline;

      })
  }

  /**
   * Get timelines and events in series using flat map
   * @param timelineId
   */
  getTimelineAndEventsSeries(timelineId: string): Observable<any> {

    const headers = new HttpHeaders({
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282'
    });

    // GET
    return this.httpClient.get(this.API_URL + 'Timeline/GetTimeline', { headers: headers.append('TimelineId', timelineId) })
      .flatMap((timeline: any) => {
        // GET EVENTS
        return this.httpClient.get(this.API_URL + 'Timeline/GetEvents', { headers: headers.append('TimelineId', timeline.Id) })
          .flatMap((events: any) => {
            // LOOP THROUGH THE EVENTS AND GET INDIVIDUALLY
            return Observable.forkJoin(
              events.map((event: any) => {
                return this.httpClient.get(this.API_URL + 'TimelineEvent/GetTimelineEvent', { headers: headers.append('TimelineEventId', event.TimelineEventId) })
                  .map((res: any) => {
                    let e = res;
                    event.event = e;
                    // timeline.Events = event;
                    return event;
                    // return timeline;
                  })
              })
            )
          });
      });
  }

  /**
   * Large function to pull down timelines and events.
   * @param timelineId ID of timeline to pull down
   */
  getTimelineAndEvents(timelineId: string): Observable<Timeline> {

    const headers = new HttpHeaders(this.API_AUTH);

    return Observable.forkJoin([
      this.getTimelineById(timelineId), // Get the Timeline object
      this.getEventsByTimelineId(timelineId)
        .flatMap((eventIds: any) => {

          console.log('There are ' + eventIds.length);

          if (eventIds.length > 0) {
            // LOOP THROUGH THE EVENTS AND GET INDIVIDUALLY
            return Observable.forkJoin(
              eventIds.map((event: any) => {

                // GET THE INDIVIDUAL EVENT
                return this.getEvent(event.TimelineEventId)
                  .flatMap((ev: any) => {

                    // GET LINKED EVENTS
                    return this.httpClient.get(this.API_URL + 'TimelineEvent/GetLinkedTimelineEvents', { headers: headers.append("TimelineEventId", ev.eventId) })
                      .flatMap((links: any) => {

                        // IF THERE ARE LINKED EVENTS
                        if (links.length > 0) {

                          // GET THE ACTUAL EVENTS BACK
                          return Observable.forkJoin(
                            links.map((linkedEvent: any) => {

                              // THIS IS RETURNING AN EVENT OBSERVABLE
                              return this.getEvent(linkedEvent.LinkedToTimelineEventId)
                                .map((res: Event) => {
                                  return res;
                                });
                            })
                          ).map((result: any) => {

                            ev.linkedEvents = result;
                            return ev;

                          });
                        } else {
                          // OTHERWISE RETURN EMPTY OBSERVABLE
                          // console.log('THERE WERE NO LINKED EVENTS HERE');
                          return Observable.of(ev);
                        }

                      });
                  })
              })
            )
          } else {
            return Observable.of([]);
          }

        })
    ]
    ).map((data: any) => {

      // console.log(data);

      const timeline: Timeline = data[0];
      const ev: Event[] = data[1];

      console.log(timeline);


      // THIS IS CAUSE ISSUES
      timeline.events = ev;
      // console.log(timeline);
      return timeline;
    });
  }

  /**
   * Create event in API
   * @param timelineId ID of timeline to link
   * @param event Event to save in the API
   */
  createEvent(timelineId:string, event: Event){

    const headers = new HttpHeaders(
      this.API_AUTH
    );
    
    const body = {
      'TenantId': 'Team2',
      'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
      TimelineEventId: event.eventId,
      Title: event.title,
      Description: event.description,
      EventDateTime: event.dateTime,
      Location: event.location
    };

    console.log(body);
    
    return this.httpClient.put(this.API_URL + 'TimelineEvent/Create', body,
      {
        headers: headers
      });    

  }

  /**
   * Convert the IdeaGen Time Format to javascript Date Object
   * @param time time to conver
   */
  private ticksToTime(time) {

    const epochTicks = 621355968000000000;
    const ticksPerMilisecond = 10000;

    return new Date((time - epochTicks) / ticksPerMilisecond);

  }

}


