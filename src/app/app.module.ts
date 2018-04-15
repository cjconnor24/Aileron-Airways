import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventApiService } from './services/event-api.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelineListComponent } from './timeline-list/timeline-list.component';
import { TimelineSearchComponent } from './timeline-search/timeline-search.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { RegisterComponent } from './register/register/register.component';
import { RegisterListComponent } from './register/register-list/register-list.component';
import { RegisterService } from './services/register.service';
import { IdeagenService } from './services/ideagen.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing-module/app-routing.module';
import { CreateTimelineComponent } from './register/create-timeline/create-timeline.component';
import { FilterPipe } from './pipes/filter.pipe';
import {DatePipe} from '@angular/common';

import { CreateEventComponent } from './events/create-event/create-event.component';
import { DeleteTimelineComponent } from './register/delete-timeline/delete-timeline.component';
import { MomentPipe } from './pipes/moment.pipe';
import { TimelineOverviewComponent } from './register/timeline-overview/timeline-overview.component';
import { ListEventComponent } from './events/list-event/list-event.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { Chart } from 'chart.js';
import { Geolocation } from '@ionic-native/geolocation';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TimelineListComponent,
    TimelineSearchComponent,
    EventSearchComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    RegisterListComponent,
    CreateTimelineComponent,
    FilterPipe,
    CreateEventComponent,
    DeleteTimelineComponent,
    MomentPipe,
    TimelineOverviewComponent,
    ListEventComponent,
    DateFilterPipe,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD6hEcUsA_ZmkI3-i3y_IZdnfeUs2Hbn0w"})
  ],
  providers: [
    IdeagenService,
    RegisterService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {


}
