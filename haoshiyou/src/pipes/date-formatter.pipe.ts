import {Pipe, PipeTransform} from "@angular/core";
import moment from "moment";
moment.locale('zh-cn');
@Pipe({
  name: 'dateFormatterPipe'
})
export class DateFormatterPipe implements PipeTransform {
  transform(value:number/*time in UTC ms */):string {
    let date = new Date(value);
    return moment(date).format('YYYY-MM-DD HH:MM');
  }
}
