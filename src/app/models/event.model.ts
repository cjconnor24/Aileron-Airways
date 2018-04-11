export class Event {

    eventId: string;
    name: string;
    dateTime: number; //TODO: Might need different type 
    description: string;
    linkedEvents: Event[];
    attachments: string;
    location: string; //TODO: Might need location object type
    

     constructor(name: string, dateTime: number, description: string, linkedEvents: Event[], attachments: string, location: string) {
         this.name = name;
         this.dateTime = dateTime;
         this.description = description;
         this.linkedEvents = [];
         this.attachments = attachments;
         this.location = location;
         

     }

}