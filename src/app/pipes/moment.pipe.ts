import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Custom pipe to result a Date object in Moment format
 */
@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    return moment(value).fromNow();
  }

}
