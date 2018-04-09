import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TimelineListComponent } from '../timeline-list/timeline-list.component';
import { CreateTimelineComponent } from '../register/create-timeline/create-timeline.component';
import { RegisterListComponent } from '../register/register-list/register-list.component';
import { DeleteTimelineComponent } from '../register/delete-timeline/delete-timeline.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  {
    path: 'timelines', component: RegisterComponent, children: [
      { path: '', component: RegisterListComponent },
      { path: 'new', component: CreateTimelineComponent },
      { path: ':id', component: TimelineListComponent },    //NEEDS UPDATED
      { path: ':id/edit', component: CreateTimelineComponent },
      { path: ':id/delete', component: DeleteTimelineComponent }
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
