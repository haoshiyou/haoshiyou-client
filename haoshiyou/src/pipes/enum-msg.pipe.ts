import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value):string {
    // TODO(xinbenlv): fix it
    if (value == 'NeedRoom') {
      return '求租';
    } else if (value == 'NeedRoommate') {
      return '招租'
    }
    else return '招租';
  }
}
