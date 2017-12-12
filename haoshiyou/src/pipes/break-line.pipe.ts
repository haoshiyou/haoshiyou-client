import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'breakLinePipe'
})
export class BreakLinePipe implements PipeTransform {
  transform(value:string/*string in content*/):string {
    return value.replace(new RegExp('\n', 'g'), "<br />");
  }
}
