import {Pipe, PipeTransform} from 'angular2/core';
import {ListingType, Listing,} from './listing';

@Pipe({name: 'EnumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value: ListingType) : string {
    switch(value) {
      case ListingType.ROOM_WANTED:
        return "Room Wanted";
      case ListingType.ROOMMATE_WANTED:
        return "Roommate Wanted";
      default:
        throw 'Unsupported ListingType.';
    }
  }
}
