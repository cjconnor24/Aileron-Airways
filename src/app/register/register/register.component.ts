import { Component, OnInit } from '@angular/core';
import { IdeagenService } from '../../services/ideagen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private ideagenService: IdeagenService){}

  ngOnInit() {
    // console.log('this logged');
    // this.ideagenService.getTimelines();
  }

}