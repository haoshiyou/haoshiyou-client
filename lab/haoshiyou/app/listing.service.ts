import { Listing } from './listing';
import { Injectable } from 'angular2/core';


/**
 * Currently just a mock service, we are going to modify it to a real service wire to backend.
 */
@Injectable()
class ListingService {
  getListings(): Promise<Listing[]> {
    return Promise.resolve(LISTINGS);
  }

  getListing(id: number): Promise<Listing> {
    return Promise.resolve(LISTINGS).then(listing => LISTINGS.filter(listing => listing.id === id)[0]);
  }
}

const LISTINGS: Listing[] = [
  {id: 11, lat: 37.41666, lon: -122.09106, content: 'Google Main Campus Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
  {id: 12, lat: 37.41564, lon: -122.06626, content: 'Avelon MTV Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
  {id: 13, lat: 37.39389, lon: -122.07031, content: 'Random Place 1 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
  {id: 14, lat: 37.41557, lon: -122.08720, content: 'Random Place 2 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
  {id: 15, lat: 37.46764, lon: -122.15458, content: 'Random Place 3 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
  {id: 16, lat: 37.45013, lon: -122.12900, content: 'Random Place 4 Lorem ipsum dolor sit amet, pri ei viris legimus persecuti, dicat legimus intellegebat est no, vix ne putent legimus ocurreret. Facilis detraxit argumentum nec te. Vim an clita imperdiet, dicunt expetenda duo ex. Periculis hendrerit te mel, ex vim malis expetenda, te vis dicam vidisse intellegam.'},
];