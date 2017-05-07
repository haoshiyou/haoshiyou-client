import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'hsyGroupEnumMsgPipe'})
export class HsyGroupEnumMsgPipe implements PipeTransform {
  transform(value):string {
    switch(value) {
      case 'SanFrancisco':
        return '三番';
      case 'SouthBayWest':
        return '南湾西';
      case 'SouthBayEast':
        return '南湾东';
      case 'EastBay':
        return '东湾';
      case 'MidPeninsula':
        return '中半岛';
      case 'Seattle':
        return '西雅图';
      default:
        return value;
    }
  }
}
