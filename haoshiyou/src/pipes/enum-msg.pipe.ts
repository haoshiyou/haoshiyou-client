import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'enumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value):string {
    // TODO(xinbenlv): fix it
    return '招租';
  }
}
