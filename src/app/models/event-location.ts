/**
 * Domain model to represent an Event Location
 */
export class EventLocation {

    name: string;
    latitude: number;
    longitude: number;

    /**
     * Initialise the object.
     * @param name Name of the event
     * @param latitude Latitude
     * @param longitude Longitude
     */
    constructor(name:string, latitude:number, longitude: number){
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

}
