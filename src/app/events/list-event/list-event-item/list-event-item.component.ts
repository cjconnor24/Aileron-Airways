import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-list-event-item',
  templateUrl: './list-event-item.component.html',
  styleUrls: ['./list-event-item.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class ListEventItemComponent implements OnInit {

  constructor() { }

  @Input() event: Event;
  @Input() i: number;

  ngOnInit() {
  }

}
