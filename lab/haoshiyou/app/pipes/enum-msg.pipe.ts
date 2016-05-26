import {Pipe, PipeTransform} from "@angular/core";
import {ListingType} from "../models/listing";

@Pipe({name: 'EnumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value:ListingType):string {
    switch (value) {
      case ListingType.ROOM_WANTED:
        return "Room Wanted";
      case ListingType.ROOMMATE_WANTED:
        return "Roommate Wanted";
      default:
        throw 'Unsupported ListingType.';
    }
  }
}
