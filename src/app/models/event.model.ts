import { EventLocation } from "./event-location";

export class Event {

    eventId: string;
    title: string;
    dateTime: Date;
    description: string;
    location: EventLocation;
    linkedEvents: Event[];
    attachments: string;
    
     constructor(id: string, title: string, description: string, dateTime: Date, location: EventLocation) {
         this.eventId = id;
         this.title = title;
         this.description = description;
         this.dateTime = dateTime;
         this.description = description;
         this.linkedEvents = [];
         this.location = location;    
     }

}
