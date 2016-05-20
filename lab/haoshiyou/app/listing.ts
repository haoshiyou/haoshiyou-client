export enum ListingType {
  ROOMMATE_WANTED,
  ROOM_WANTED,
}

export class Listing {
  id: number;
  lat: number; // latitude
  lng: number; // longitude
  content: string;
  title: string;
  type: ListingType;
  ownerId: number;
}