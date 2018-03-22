export class Event {

    eventId: string;
    title: string;
    description: string;
    dateTime: string; //TODO: Might need different type
    location: string; //TODO: Might need location object type
    linkedEvents: Event[];

}