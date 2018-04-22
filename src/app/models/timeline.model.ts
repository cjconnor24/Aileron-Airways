import { TimelineEvent } from "./timeline-event.model";
import { Guid } from "../services/guid";

/**
 * Domain model to represent the Timeline object.
 */
export class Timeline extends Guid {

    timelineId: string;
    title: string;
    events: TimelineEvent[];
    dateCreated: Date;

    /**
     * Initialise Timeline object
     * @param title Timeline title
     * @param events Array of existing events
     */
    constructor(title: string, events?: TimelineEvent[]) {

        super();
        this.timelineId = this.uuidv4();
        this.title = title;
        this.events = [];
    }

}
