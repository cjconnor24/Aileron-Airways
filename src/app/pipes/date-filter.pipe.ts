import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {

  constructor(public datepipe: DatePipe){}

  transform(items: any[], dateSearch: Date): any[] {

    if(!items) return[];
    if(!dateSearch) return items;
    //fix the date format
    let dateSearch2 = this.datepipe.transform(dateSearch, 'EE MMM dd yyyy');

    console.log(dateSearch2);
    

    return items.filter( item => {
      return item.dateCreated.toDateString().includes(dateSearch2);
    }
  )
}
}
