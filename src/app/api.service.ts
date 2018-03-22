import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Data } from './Data';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }



  public getTimelines(): Observable<Data[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', 'Team2');
    myHeaders.append('AuthToken', 'b3872e1b-12e3-4852-aaf0-a3d87d597282');
    return this.http
      .get(API_URL + 'Timeline/GetTimelines', { headers: myHeaders })
      .map(response => {
        const data = response.json();
        return data.map((data) => new Data(data));


      })
      .catch(this.handleError);
  }

  public editTitle(): Observable<Data[]> {

    let myHeaders = new Headers();
    myHeaders.append('TenantId', 'Team2');
    myHeaders.append('AuthToken', 'b3872e1b-12e3-4852-aaf0-a3d87d597282');
    return this.http
      .get(API_URL + 'Timeline/EditTitle', { headers: myHeaders })
      .map(response => {
        const todos = response.json();
        return todos.map((todo) => new Data(todo));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
