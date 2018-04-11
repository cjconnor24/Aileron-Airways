import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AgmCoreModule } from '@agm/core';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { DeleteTimelineComponent } from './register/delete-timeline/delete-timeline.component';
import { MomentPipe } from './pipes/moment.pipe';
import { TimelineOverviewComponent } from './register/timeline-overview/timeline-overview.component';
import { ListEventComponent } from './events/list-event/list-event.component';
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { ListEventItemComponent } from './events/list-event/list-event-item/list-event-item.component';
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { LayoutSliderComponent } from './ui/layout-slider/layout-slider.component';

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
    ListEventItemComponent,
    SpinnerComponent,
    LayoutSliderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
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
export class AppModule { }
