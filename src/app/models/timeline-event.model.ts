import { Guid } from "../services/guid";
import { Attachment } from "./attachment.model";
import { EventLocation } from "./event-location";

/**
 * Domain model to represent TimelineEvent object
 */
export class TimelineEvent extends Guid {

    eventId: string;
    title: string;
    description: string;
    dateTime: Date;
    location: EventLocation;
    linkedEvents: TimelineEvent[];
    attachments: Attachment[];

    /**
     * Build Timeline event object.
     * @param title Title of event
     * @param description Description of event
     * @param dateTime DateTime of event
     * @param location Location of the event
     * @param id Optional - create using existing ID
     */
    constructor(title: string, description: string, dateTime: Date, location: EventLocation, id?: string) {

        super();
        this.eventId = (id ? id : this.uuidv4()); // IF ID IS PASSED THROUGH, USE THAT, OTHERWISE GENERATE GUID
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.location = location;
        this.linkedEvents = [];
        this.attachments = [];

    }

}
