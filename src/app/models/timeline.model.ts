export class Timeline {

    timelineId: string;
    title: string;
    events: Event[];
    dateCreated: Date;

    constructor(title: string, events?: Event[]) {
        this.timelineId = Math.floor((Math.random() * 99999) + 10000).toString();
        this.title = title;
        // if (events.length > 0) {
        //     this.events = events;
        // } else {
            this.events = [];
        // }
    }

}
