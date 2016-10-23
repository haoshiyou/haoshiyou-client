export type ListingId = string;
export enum ListingType {
  ROOMMATE_WANTED,
  ROOM_WANTED,
}

export interface Listing {
  id:ListingId;
  lat:number; // latitude
  lng:number; // longitude
  content:string;
  title:string;
  type:ListingType;
  ownerId:string;
  lastUpdated:number; // in UTC Milliseconds
  imageIds:string[]; // ids
}
