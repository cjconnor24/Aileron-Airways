import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { Event as TEvent } from '../models/event.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';



@Injectable()
export class IdeagenService {

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

              const e: TEvent = new TEvent(event.Id, event.Title, event.Description, this.ticksToTime(event.EventDateTime), event.Location);

              console.log(e);

              return e;
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
  getEvent(eventId: string): Observable<TEvent> {

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
        const event: TEvent = new TEvent(data.Id, data.Title, data.Description, this.ticksToTime(data.EventDateTime), data.Location);
        return event;
      });

  }

  // tempGetEvent(eventId: string): Observable<any> {

  //   const headers = new HttpHeaders({
  //     'TenantId': 'Team2',
  //     'AuthToken': 'b3872e1b-12e3-4852-aaf0-a3d87d597282',
  //     'TimelineEventId': eventId
  //   });

  //   return this.httpClient.get(this.API_URL + 'TimelineEvent/GetTimelineEvent', { headers: headers });

  // }


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
   * Get timelines and events in series
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

  getTimelineAndEventsDeeper(timelineId: string): Observable<any> {

    const headers = new HttpHeaders(this.API_AUTH);

    return Observable.forkJoin([
      this.getTimelineById(timelineId), // Get the Timeline object
      this.getEventsByTimelineId(timelineId)
        .flatMap((events: any) => {

          // LOOP THROUGH THE EVENTS AND GET INDIVIDUALLY
          return Observable.forkJoin(
            events.map((event: any) => {
              return this.getEvent(event.TimelineEventId);
            })
          )

        })
    ]
    ).map((data: any) => {
      
      let timeline: Timeline = data[0];
      let events: TEvent[] = data[1];

      console.log(events);
      timeline.events = events;
      
      // timeline.events = events;
      return timeline;
    });

    // GET     


  }


  // getTimelineAndEventsDeeper(timelineId: string): Observable<any> {

  //   const headers = new HttpHeaders(this.API_AUTH);

  //   return Observable.forkJoin([
  //     this.httpClient.get(this.API_URL + 'Timeline/GetTimeline', { headers: headers.append('TimelineId', timelineId) }),
  //     this.httpClient.get(this.API_URL + 'Timeline/GetEvents', { headers: headers.append('TimelineId', timelineId) })
  //       .flatMap((events: any) => {

  //         // LOOP THROUGH THE EVENTS AND GET INDIVIDUALLY
  //         return Observable.forkJoin(
  //           events.map((event: any) => {
  //             return this.getEvent(event.TimelineEventId)
  //               // .map((res: Event) => {
  //               //   let e = res;
  //               //   // event.event = e;
  //               //   // timeline.Events = event;
  //               //   return e;
  //               //   // return timeline;
  //               // })
  //           })
  //         )

  //       })
  //   ]
  //   ).map((data: any) => {
  //     let timeline: any = data[0];
  //     let events: any = data[1];
  //     timeline.Events = events;
  //     return timeline;
  //   });

  //   // GET     


  // }

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


