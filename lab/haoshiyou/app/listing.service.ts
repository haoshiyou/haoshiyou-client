import { Listing, ListingType } from './listing';
import { Injectable } from 'angular2/core';


/**
 * Currently just a mock service, we are going to modify it to a real service wire to backend.
 */
@Injectable()
export class ListingService {
  getListings(): Promise<Listing[]> {
    return Promise.resolve(LISTINGS);
  }

  getListing(id: number): Promise<Listing> {
    return Promise.resolve(LISTINGS).then(listing => LISTINGS.filter(listing => listing.id === id)[0]);
  }
}

const LISTINGS: Listing[] = [
  {id: 11, lat: 37.41666, lng: -122.09106, content: 'Google Main Campus Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 1, type: ListingType.ROOMMATE_WANTED, title: 'Google Main Campus' },
  {id: 12, lat: 37.41564, lng: -122.06626, content: 'Avelon MTV Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 2, type: ListingType.ROOM_WANTED, title: 'Avelon MTV'},
  {id: 13, lat: 37.39389, lng: -122.07031, content: 'Random Place 1 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 3, type: ListingType.ROOM_WANTED, title: 'Random Place 1'},
  {id: 14, lat: 37.41557, lng: -122.08720, content: 'Random Place 2 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 4, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: 15, lat: 37.46764, lng: -122.15458, content: 'Random Place 3 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 5, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: 16, lat: 37.45013, lng: -122.12900, content: 'Random Place 4 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 6, type: ListingType.ROOM_WANTED, title: 'Random Place 1'},
  {id: 17, lat: 37.46764, lng: -122.15458, content: 'Random Place 3 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 7, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: 18, lat: 37.45013, lng: -122.12900, content: 'Random Place 4 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 8, type: ListingType.ROOM_WANTED, title: 'Random Place 1'}
];