export type ListingId = string;
export enum ListingType {
  ROOMMATE_WANTED,
  ROOM_WANTED,
}

export namespace ListingType {
  export function values() {
    return [ListingType.ROOMMATE_WANTED, ListingType.ROOM_WANTED];
  }
}

export class Listing {
  id:ListingId;
  lat:number; // latitude
  lng:number; // longitude
  content:string;
  title:string;
  type:ListingType;
  ownerId:number;
  updated:Date;
}
