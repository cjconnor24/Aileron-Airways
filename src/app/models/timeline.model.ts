import { TimelineEvent } from "./timeline-event.model";
import { Guid } from "../services/guid";

export class Timeline extends Guid {
    timelineId: String;
    title: string;
    events: TimelineEvent[];
    dateCreated: Date;

    constructor( title: string, events?: TimelineEvent[]) {

        super();
        this.timelineId = this.uuidv4();
        this.title = title;
        // if (events.length > 0) {
        //     this.events = events;
        // } else {
            this.events = [];
        // }
    }
    // public uuidv4() {
    
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //       var r = Math.random() * 16 | 0, uuidv4 = c == 'x' ? r : (r & 0x3 | 0x8);
    //       return uuidv4.toString(16);
    //     });
    //   }
}
