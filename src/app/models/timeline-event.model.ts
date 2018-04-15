import { Guid } from "../services/guid";

export class TimelineEvent extends Guid {

    eventId: string;
    title: string;
    description: string;
    dateTime: Date; // TODO: Might need different type
    location: string; // TODO: Might need location object type
    linkedEvents: TimelineEvent[];




     constructor( title: string, description: string, dateTime: Date, location: string) {
         super();
         this.eventId = this.uuidv4();
         this.title = title;
         this.description = description;
         this.dateTime = dateTime;
         this.location = location;
         this.linkedEvents = [];

     }

}
