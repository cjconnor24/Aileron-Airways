import { Component, OnInit } from '@angular/core';
import { Timeline } from '../../models/timeline.model';
import { RegisterService } from '../../services/register.service';
import { IdeagenService } from '../../services/ideagen.service';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit {

  register: Timeline[];
  

  constructor(private registerService: RegisterService, private ideagenService: IdeagenService) { }

  ngOnInit() {
    this.register = this.registerService.getTimelines();
    // this.register =this.registerService.getTimelines();

    this.ideagenService.getTimelines();
  }

}
