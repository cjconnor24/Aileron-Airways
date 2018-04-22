import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Timeline } from '../../models/timeline.model';
import { IdeagenService } from '../../services/ideagen.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit, OnDestroy {

  // LOCAL VARIABLES FOR THE COMPONENT
  register: Timeline[];
  subscriber: Subscription;
  searchText: string;
  loaded = false;
  rowsMode:boolean = false; // THIS HOLDS THE STATE FOR THE LAYOUT


  constructor(private registerService: RegisterService, private ideagenService: IdeagenService) { }


  /**
   * Inialise the component with timeline data
   */
  ngOnInit() {

    // GET THE STATIC TIMELINES FROM THE SERVICE THEN LISTEN TO THE SUBJECT
    this.register = this.registerService.getTimelines();
    this.subscriber = this.registerService.registerChanged.subscribe(
      (timelines: Timeline[]) => {


        // SORT IN REVERSE ORDER
        this.register = timelines.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();
        this.loaded = true;
      }
    );
  
  }

  /**
   * Update the layout based on event emitter from slider component
   * @param rows State of the layout
   */
  toggleLayout(rows: boolean){

    this.rowsMode = rows;

  }

  /**
   * Fetch register data from register service
   */
  fetchData(){
    this.register = this.registerService.getTimelines();
  //  this.registerEv = this.registerService.getAllEvent();
  }

  /**
   * Unsubscribe from the subscription when the component is destroyed.
   */
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
