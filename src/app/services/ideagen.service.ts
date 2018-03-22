import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';
import {environment} from '../../environments/environment';

@Injectable()
export class IdeagenService {

  // constructor(private httpClient: HttpClient, private registerService: RegisterService) { }

  API_URL = environment.apiUrl;

  getTimelines(){

    // let headerdata = new HttpHeaders();
    // headerdata.append('TenantId', environment.tenantId);
    // headerdata.append('AuthToken',environment.authToken);

    // return this.httpClient.get(this.API_URL + 'Timeline/GetTimelines',{headers: headerdata})
    // .map(
    //   (timelines) => {
    //     // const recipes: Recipe[] = response.json();
    //     // for(let timeline of timelines){
    //     //   if(!recipe['ingredients']){
    //     //     recipe['ingredients'] = [];
    //     //   }
    //     // }
    //     return timelines;
    //   }
    // ).subscribe(
    //   (timelines: Timeline[]) => {
    //     console.log(timelines);
    //     this.registerService.setTimelines(timelines);
    //   }
    // )
  }

}
