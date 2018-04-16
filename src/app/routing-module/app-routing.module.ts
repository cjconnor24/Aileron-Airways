import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CreateTimelineComponent } from '../register/create-timeline/create-timeline.component';
import { RegisterListComponent } from '../register/register-list/register-list.component';
import { DeleteTimelineComponent } from '../register/delete-timeline/delete-timeline.component';
import { TimelineOverviewComponent } from '../register/timeline-overview/timeline-overview.component';
import { ListEventComponent } from '../events/list-event/list-event.component';
import { CreateEventComponent } from '../events/create-event/create-event.component';

const routes: Routes = [
 { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
 {path: 'dashboard', component: DashboardComponent}, 
  {
    path: 'timelines', component: RegisterComponent, children: [
      { path: '', component: RegisterListComponent },
      { path: 'create', component: CreateTimelineComponent },
      { path: ':id', component: ListEventComponent },    //NEEDS UPDATED
      { path: ':id/edit', component: CreateTimelineComponent },
      { path: ':id/overview', component: TimelineOverviewComponent },
      { path: ':id/delete', component: DeleteTimelineComponent },

      { path: ':id/events/create', component: CreateEventComponent },
      { path: ':id/events/:eventid/edit', component: CreateEventComponent },
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
