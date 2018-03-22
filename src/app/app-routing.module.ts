import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {Routes, RouterModule} from '@angular/router';
import { TimelineListComponent } from './timeline-list/timeline-list.component';
import { ApiFormComponent } from './api-form/api-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path : 'dashboard', component: DashboardComponent },
  { path : 'timeline-list', component: TimelineListComponent },
  { path : 'api-form', component: ApiFormComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports:[
    RouterModule
  ]

})
export class AppRoutingModule { }
