import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { TimelineListComponent } from './timeline-list/timeline-list.component';
import { TimelineSearchComponent } from './timeline-search/timeline-search.component';
import { EventSearchComponent } from './event-search/event-search.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TimelineListComponent,
    TimelineSearchComponent,
    EventSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
