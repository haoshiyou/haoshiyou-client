import {Pipe, PipeTransform} from 'angular2/core';
import {ListingType, Listing,} from './listing';

@Pipe({name: 'EnumMsgPipe'})
export class EnumMsgPipe implements PipeTransform {
  transform(value: ListingType) : string {

    switch(value) {
      case ListingType.ROOM_WANTED:
        return "Room wanted";
      case ListingType.ROOMMATE_WANTED:
        return "Roommate wanted";
      default:
        throw 'Unsupported ListingType.';
    }
  }
}
