import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Timeline } from '../models/timeline.model';

@Injectable()
export class IdeagenService {

  constructor(private httpClient: HttpClient, private registerService: RegisterService) { }

  getTimelines(){
    return this.httpClient.get<Timeline[]>('https://gcu.ideagen-development.com/Timeline/GetTimelines')
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
        console.log('subscribe log runng');
        this.recipeService.setReceipes(recipes);
      }
    )
  }

}
