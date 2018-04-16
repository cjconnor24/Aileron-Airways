import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-layout-slider',
  templateUrl: './layout-slider.component.html',
  styleUrls: ['./layout-slider.component.scss']
})
export class LayoutSliderComponent implements OnInit {

  @Output() selectedState: EventEmitter<boolean> = new EventEmitter<boolean>();

  checked: boolean = false;

  constructor() { }

  /**
   * When the box is checked - emit an event
   */
  onChecked():void{
    this.checked = !this.checked;
    this.selectedState.emit(this.checked);
  }

  ngOnInit(){}

}
