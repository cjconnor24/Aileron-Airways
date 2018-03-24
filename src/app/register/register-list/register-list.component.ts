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

// THIS WILL CURRENTLY GET THE STATIC TIMELINES FROM THE SERVICE
    this.register = this.registerService.getTimelines();
    

    // THIS WILL PULL IN FROM THE API
    // this.register = this.ideagenService.getTimelines().subscribe(
    //   (timelines: Timeline[]) => {
    //     return timelines;
    //   }
    // );
  }

}
