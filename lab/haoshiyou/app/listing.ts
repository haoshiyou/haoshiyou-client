
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

/*
export class Listing {
  id: number;
  lat: number; // latitude
  lng: number; // longitude
  content: string;
  title: string;
  type: ListingType;
  ownerId: number;
  constructor(
      id: number,
      lat: number, // latitude
      lng: number, // longitude
      content: string,
      title: string,
      ownerId: number,
      type?: ListingType = ListingType.ROOM_WANTED) {
    this.id = id;
    this.lat = lat;
    this.lng = lng;
    this.content = content;

    if (title == null || title == '')
      this.title = this.content.slice(30) + '...';
    else this.title = title;
    this.ownerId = ownerId;
    this.type = type;
}
*/