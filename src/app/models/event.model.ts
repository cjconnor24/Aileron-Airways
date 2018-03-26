export class Event {

    eventId: string;
    title: string;
    description: string;
    dateTime: number; //TODO: Might need different type
    location: string; //TODO: Might need location object type
    linkedEvents: Event[];




     constructor(id: string, title: string, description: string, dateTime: number, location: string) {
         this.eventId = id;
         this.title = title;
         this.description = description;
         this.dateTime = dateTime;
         this.location = location;
         this.linkedEvents = [];

     }

}