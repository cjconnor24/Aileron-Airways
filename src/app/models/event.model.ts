export class Event {

    eventId: string;
    title: string;
    dateTime: Date; //TODO: Might need different type 
    description: string;
    location: string; // TODO: Might need location object type
    linkedEvents: Event[];
    attachments: string;
    




     constructor(id: string, title: string, description: string, dateTime: Date, location: string) {
         this.eventId = id;
         this.title = title;
         this.description = description;
         this.dateTime = dateTime;
         this.description = description;
         this.linkedEvents = [];
         this.location = location;
         

     }

}
