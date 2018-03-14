import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { EventFormComponent } from './event-form/event-form.component';
import { TimelineFormComponent } from './timeline-form/timeline-form.component';


@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    TimelineFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
