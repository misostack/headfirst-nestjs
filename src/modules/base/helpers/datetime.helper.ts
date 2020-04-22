import * as moment from 'moment-timezone';

export class DateTimeHelper {
  static now() : number {
    return moment().format('x');
  }
}