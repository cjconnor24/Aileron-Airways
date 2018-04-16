import { Pipe, PipeTransform } from '@angular/core';
import { TimelineEvent } from '../models/timeline-event.model';

@Pipe({
  name: 'sortEvents'
})
export class SortEventsPipe implements PipeTransform {

  transform(value: TimelineEvent[], order?: string): any {

    if(order==='asc'){
      return value.sort((a: any, b: any) => a.dateCreated - b.dateCreated);
    } else if(order==='desc') {
      return value.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();
    } else {
      return value.sort((a: any, b: any) => a.dateCreated - b.dateCreated).reverse();
    }

    
  }

}
