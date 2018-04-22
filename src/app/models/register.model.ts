import { Timeline } from './timeline.model';
import { TimelineEvent } from './timeline-event.model';

/**
 * Domain model to represent Register object.
 */
export class Register {

    timelines: Timeline[];
    events: TimelineEvent[];

}
