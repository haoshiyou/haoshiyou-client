import { Listing, ListingType, ListingId } from './listing';
import { Injectable } from 'angular2/core';

@Injectable()
export class ListingService {
  getListings(): Promise<Listing[]> {
    throw "Not implemnted";
  }

  getListing(id: ListingId): Promise<Listing> {
    throw "Not implemented";
  }

  createListing(listing: Listing): Promise<ListingId> {
    throw "Not implemnted";
  }
}

export class MockListingService {
  private listings: Listing[];
  constructor() {
    this.listings = LISTINGS; // initialize with default fake data
  }

  getListings(): Promise<Listing[]> {
    return Promise.resolve(LISTINGS);
  }

  getListing(id: ListingId): Promise<Listing> {
    return Promise.resolve(LISTINGS).then(listing => LISTINGS.filter(listing => listing.id === id)[0]);
  }


  createListing(listing): Promise<ListingId> {
    let listingId: ListingId = MockListingService.uuid();
    listing.id = listingId;
    this.listings.push(listing);
    return Promise.resolve(listingId);
  }

  private static uuid(): string {
    var i, random;
    var result = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        result += '-';
      }
      result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
          .toString(16);
    }
    return result;
  };
}


const LISTINGS: Listing[] = [
  {id: 'd16666b4-0f9d-4180-a762-2bc4befb8c95', lat: 37.41666, lng: -122.09106, content: 'Google Main Campus Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 1, type: ListingType.ROOMMATE_WANTED, title: 'Google Main Campus' },
  {id: '2250a1ad-5c35-40d4-ad8d-71bf7730a92f', lat: 37.41564, lng: -122.06626, content: 'Avelon MTV Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 2, type: ListingType.ROOM_WANTED, title: 'Avelon MTV'},
  {id: '6a42ecb7-2335-4009-a35d-80f34e3910a5', lat: 37.39389, lng: -122.07031, content: 'Random Place 1 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 3, type: ListingType.ROOM_WANTED, title: 'Random Place 1'},
  {id: '108a4e0c-adaf-43e4-98e2-101566103dd3', lat: 37.41557, lng: -122.08720, content: 'Random Place 2 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 4, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: 'b1ca8329-7d6d-485b-9a3a-a3e1baf4e695', lat: 37.46764, lng: -122.15458, content: 'Random Place 3 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 5, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: 'ed06e5f2-09bf-4d1f-a9b0-1e27ce659142', lat: 37.45013, lng: -122.12900, content: 'Random Place 4 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 6, type: ListingType.ROOM_WANTED, title: 'Random Place 1'},
  {id: '0055704b-2819-4b37-9e7f-223d9669350b', lat: 37.46764, lng: -122.15458, content: 'Random Place 3 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 7, type: ListingType.ROOMMATE_WANTED, title: 'Random Place 1'},
  {id: '608357e4-1b60-4eb8-9db4-0ad4fd731f99', lat: 37.45013, lng: -122.12900, content: 'Random Place 4 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.',
    ownerId: 8, type: ListingType.ROOM_WANTED, title: 'Random Place 1'}
];