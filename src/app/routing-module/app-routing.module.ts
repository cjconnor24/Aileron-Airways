import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TimelineListComponent } from '../timeline-list/timeline-list.component';
import { CreateTimelineComponent } from '../register/create-timeline/create-timeline.component';
import { RegisterListComponent } from '../register/register-list/register-list.component';
import { CreateEventComponent } from '../events/create-event/create-event.component';

const routes: Routes = [
  
    {path: 'dashboard', component: DashboardComponent},
    {path: 'eventform', component: CreateEventComponent},
    {path: 'timelines', component: RegisterComponent, children: [
      { path: '', component: RegisterListComponent } ,      //NEEDS UPDATED
      { path: 'new', component: CreateTimelineComponent },  //NEEDS UPDATED
      { path: ':id', component: TimelineListComponent },    //NEEDS UPDATED
      { path: ':id/edit', component: RegisterComponent }    //NEEDS UPDATED
    ]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
