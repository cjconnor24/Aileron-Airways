import {Injectable} from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {


  lastId: number = 0;


  data: Data[] = [];

  constructor(
     private api: ApiService
   ) {
   }




   getAllData(): Observable<Data[]> {
     return this.api.getTimelines();
   }



}

export class Data {
  id: number;
  title: string = '';
  complete: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
