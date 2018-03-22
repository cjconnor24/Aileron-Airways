export class Timeline {

    timelineId: string;
    title: string;
    events: Event[];

    constructor(title:string){
        this.title = Math.floor((Math.random()*6)+1).toString();
        this.title = title;
        this.events = [];
    }

}