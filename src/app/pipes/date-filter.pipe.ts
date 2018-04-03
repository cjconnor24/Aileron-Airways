import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  transform(items: any[], dateSearch: Date): any[] {
    var dateString = "";
    
    if(!items) return[];
    if(!dateSearch) return items;

    dateString = dateSearch.toDateString();

    return items.filter( item => {
      return item.dateCreated.toDateString().includes(dateString);
    }
  )
}
}
