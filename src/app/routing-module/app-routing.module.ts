import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TimelineListComponent } from '../timeline-list/timeline-list.component';
import { CreateTimelineComponent } from '../register/create-timeline/create-timeline.component';
import { RegisterListComponent } from '../register/register-list/register-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'timelines', component: RegisterComponent, children: [
      { path: '', component: RegisterListComponent } ,   // NEEDS UPDATED
      { path: 'new', component: CreateTimelineComponent }, // NEEDS UPDATED
      { path: ':id', component: RegisterComponent }, // NEEDS UPDATED
      { path: ':id/edit', component: RegisterComponent } // NEEDS UPDATED
    ]
  },
  { path : 'dashboard', component: DashboardComponent},
  { path : 'timeline-list', component: TimelineListComponent}
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
