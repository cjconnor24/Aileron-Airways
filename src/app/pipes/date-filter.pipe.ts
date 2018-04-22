import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  
  constructor(public datepipe: DatePipe) { }

  transform(items: any[], dateSearch: Date): any[] {

    if (!items) return [];
    if (!dateSearch) return items;

    let dateSearch2 = this.datepipe.transform(dateSearch, 'EE MMM dd yyyy');

    return items.filter(item => {
      return item.dateCreated.toDateString().includes(dateSearch2);
    }

    )
  }
}
