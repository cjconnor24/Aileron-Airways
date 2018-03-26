import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/of';
import 'rxjs/add/observable/of';

import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';



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
            tl.dateCreated = new Date((timeline.CreationTimeStamp-621355968000000000)/10000);
            
            // tl.events = timeline.TimelineEvents;

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

 // searchTimelines(term: string): Observable<Timeline[]>{
 //       if(!term.trim()){
 //         return of([]);
   //     }
     //   return this.httpClient.get<Timeline[]>(`this.API_URL/?title=${term}`).pipe(
       //   catchError(this.handleError<Timeline[]>('searchTimelines', []))
       // );
      
  // }

 // private handleError<T> (operation = 'operation', result?: T) {
   // return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
     // console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
    // return of(result as T);
   // };
 // }

}

