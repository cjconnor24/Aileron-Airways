import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class IdeagenService {

  constructor(private httpClient: HttpClient) { }

  API_URL = environment.apiUrl;

  getTimelines() {

    const headers = new HttpHeaders(
      {
        'TenantId':'Team2',
        'AuthToken':'b3872e1b-12e3-4852-aaf0-a3d87d597282'
      }
    );

    return this.httpClient.get(this.API_URL + 'Timeline/GetTimelines', { headers: headers })
      .map(
        (timelines) => {
          // const recipes: Recipe[] = response.json();
          // for(let timeline of timelines){
          //   if(!recipe['ingredients']){
          //     recipe['ingredients'] = [];
          //   }
          // }
          return timelines;
        }
      ).subscribe(
        (timelines: Timeline[]) => {
          console.log(timelines);
          this.registerService.setTimelines(timelines);
        }
      );
  }

}
