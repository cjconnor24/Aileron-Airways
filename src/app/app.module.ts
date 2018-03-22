import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TimelineApiService } from './Timelineapi.service';
import { DataService } from './data.service';
import { ApiFormComponent } from './api-form/api-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { TimelineListComponent } from './timeline-list/timeline-list.component';
import { TimelineSearchComponent } from './timeline-search/timeline-search.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { EventApiService } from './event-api.service';
import { EventAttachmentApiService } from './event-attachment-api.service';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TimelineListComponent,
    TimelineSearchComponent,
    EventSearchComponent,
    ApiFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // DashboardComponent,
    // TimelineListComponent,
    // TimelineSearchComponent,
    // EventSearchComponent,
    // ApiFormComponent,
    AppRoutingModule
  ],

  providers: [TimelineApiService, DataService, EventApiService, EventAttachmentApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
