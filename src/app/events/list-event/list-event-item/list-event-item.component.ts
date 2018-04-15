import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { TimelineEvent } from '../../../models/timeline-event.model';

@Component({
  selector: 'app-list-event-item',
  templateUrl: './list-event-item.component.html',
  styleUrls: ['./list-event-item.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ListEventItemComponent implements OnInit {

  constructor() { }

  @Input() event: TimelineEvent;
  @Input() i: number;
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();



  /**
   * Emit event with eventId for parent component to process deletion
   */
  onDelete(){

    this.deleteEvent.emit(this.event.eventId);

  }
  

  ngOnInit() {
  }

}
