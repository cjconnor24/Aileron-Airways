import { Guid } from "../services/guid";
import { Attachment } from "./attachment.model";

/**
 * Represents TimelineEvent Model
 */
export class TimelineEvent extends Guid {

    eventId: string;
    title: string;
    description: string;
    dateTime: Date; // TODO: Might need different type
    location: string; // TODO: Might need location object type
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
    constructor(title: string, description: string, dateTime: Date, location: string, id?: string) {
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
