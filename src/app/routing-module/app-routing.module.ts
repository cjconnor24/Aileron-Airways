import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { RegisterComponent } from '../register/register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TimelineListComponent } from '../timeline-list/timeline-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path : 'register', component: RegisterComponent},
  { path : './dashboard', component: DashboardComponent},
  { path : './timeline-list', component: TimelineListComponent}
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
