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
  @Input() rowIndex: number;
  @Input() nested: boolean;
  @Input() parent: boolean;

  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();

  deleting: boolean = false;

  /**
     * Emit event with eventId for parent component to process deletion
     */
  onDelete() {

    this.deleting = true;
    this.deleteEvent.emit(this.event.eventId);

  }

  getClassName() {

    if(this.parent){
      return 'left';
    } else if (this.nested) {
      return 'right';
    }

    if (this.rowIndex % 2 === 0) {

      return 'left';

    } else {

      return 'right';

    }

  }


  ngOnInit() {

  }

}
