import {Listing, ListingId} from "../../models/listing";
import {Injectable} from "@angular/core";
import {FAKE_LISTINGS} from "../../fakedata/listing-fake-data";

@Injectable()
export class IListingService {
  /**
   * Get a list of listing, by default it should sort by date desc.
   */
  getListings():Promise<Listing[]> {
    throw "Not implemented";
  }

  /**
   * Get a listing by its id
   * @param id
   */
  getListingById(id:ListingId):Promise<Listing> {
    throw "Not implemented";
  }

  /**
   * Add a listing to the all listings.
   * @param listing: the value of listing for creation.
   */
  createListing(listing:Listing):Promise<void> {
    throw "Not implemented";
  }
}

export class MockListingService {
  private listings:Listing[];

  constructor() {
    this.listings = FAKE_LISTINGS; // initialize with default fake data
  }

  getListings():Promise<Listing[]> {
    return Promise.resolve(this.listings)
        .then(listings => listings.sort(
            (l1:Listing, l2:Listing) => l1.updated.getTime() - l2.updated.getTime())
            .reverse());
  }

  getListingById(id:ListingId):Promise<Listing> {
    return Promise.resolve(this.listings)
        .then(listings => listings.filter(listing => listing.id === id)[0]);
  }

  createListing(listing):Promise<void> {
    let listingId:ListingId = MockListingService.uuid();
    listing.id = listingId;
    this.listings.push(listing);
    return Promise.resolve();
  }

  private static uuid():string {
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
