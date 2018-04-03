export class Event {

    eventId: string;
    name: string;
    dateTime: number; //TODO: Might need different type 
    description: string;
    relatedEvents: string;
    attachments: string;
    location: string; //TODO: Might need location object type
    linkedEvents: Event[];

     constructor(name: string, dateTime: number, description: string, relatedEvents: string, attachments: string, location: string) {
         this.name = name;
         this.dateTime = dateTime;
         this.description = description;
         this.location = location;
         this.linkedEvents = [];

     }

}