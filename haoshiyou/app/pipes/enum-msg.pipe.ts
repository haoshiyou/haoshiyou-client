import {Pipe, PipeTransform} from "@angular/core";
import {ListingType} from "../models/listing";

@Pipe({name: 'enumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value:ListingType):string {
    switch (value) {
      case ListingType.ROOM_WANTED:
        return "求租";
      case ListingType.ROOMMATE_WANTED:
        return "招租";
      default:
        throw 'Unsupported ListingType.';
    }
  }
}
