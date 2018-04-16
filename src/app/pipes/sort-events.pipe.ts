import { Pipe, PipeTransform } from '@angular/core';
import { TimelineEvent } from '../models/timeline-event.model';

@Pipe({
  name: 'sortEvents'
})
export class SortEventsPipe implements PipeTransform {

  transform(value: TimelineEvent[], args?: any): any {
    return value.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();
  }

}
