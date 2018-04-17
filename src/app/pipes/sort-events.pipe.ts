import { Pipe, PipeTransform } from '@angular/core';
import { TimelineEvent } from '../models/timeline-event.model';

@Pipe({
  name: 'sortEvents'
})
export class SortEventsPipe implements PipeTransform {

  transform(value: TimelineEvent[], order?: string): any {

    if(order==='asc'){
      return value.sort((a: any, b: any) => a.dateTime - b.dateTime);
    } else if(order==='desc') {
      return value.sort((a: any, b: any) => a.dateTime - b.dateTime).reverse();
    } else {
      return value.sort((a: any, b: any) => a.dateTime - b.dateTime).reverse();
    }

    
  }

}
