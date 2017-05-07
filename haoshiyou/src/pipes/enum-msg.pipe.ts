import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value):string {
    // TODO(xinbenlv): fix it
    if (value == 1) {
      return '求租';
    }
    else return '招租';
  }
}
