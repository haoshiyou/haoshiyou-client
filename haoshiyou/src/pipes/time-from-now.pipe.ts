import {Pipe, PipeTransform} from "@angular/core";
import moment from "moment";
moment.lang('zh-cn');
@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {
  transform(value:number/*time in UTC ms */):string {
    return moment(new Date(value)).fromNow();
  }
}
