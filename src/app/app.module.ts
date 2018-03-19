import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { ApiFormComponent } from './api-form/api-form.component';
=======
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { TimelineListComponent } from './timeline-list/timeline-list.component';
import { TimelineSearchComponent } from './timeline-search/timeline-search.component';
import { EventSearchComponent } from './event-search/event-search.component';
>>>>>>> master


@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    ApiFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
=======
    DashboardComponent,
    TimelineListComponent,
    TimelineSearchComponent,
    EventSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
>>>>>>> master
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
