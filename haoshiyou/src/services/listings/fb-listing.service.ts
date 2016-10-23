import {Listing, ListingId} from "../../models/listing";
import {IListingService} from "./listing.service";
import {Injectable, Inject} from "@angular/core";
import {AngularFire, FirebaseListObservable} from "angularfire2/angularfire2";
import {loggerToken} from "../log.service";
import {Logger} from "log4javascript/log4javascript";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FirebaseListingService implements IListingService {
  private listingsObservable: FirebaseListObservable<Listing[]>;
  constructor(private af:AngularFire, @Inject(loggerToken) private logger:Logger) {
    this.listingsObservable = this.af.database.list("/listings", {
      query: {
        orderByChild: 'lastUpdated'
      }
    });
  }

  /**
   * Get a list of listing, by default it should sort by date desc.
   */
  getListings():Promise<Listing[]> {
    return this.listingsObservable.take(1).toPromise();
  }

  observableListings():Observable<Listing[]> {
    return this.listingsObservable;
  }

  /**
   * Get a listing by its id
   * @param id
   */
  getListingById(id:ListingId):Promise<Listing> {
    return this.af.database.object("/listings/" + id).take(1).toPromise() as Promise<Listing>;
  }

  /**
   * Add a listing to the all listings.
   * @param listing: the value of listing for creation.
   */
  createListing(listing:Listing):Promise<void> {
    this.logger.debug(`Create or saving ${JSON.stringify(listing)}`);
    if (listing["$key"]) {
      this.logger.assert(listing.id == listing["$key"]);
      delete  listing["$key"]; // strip $key before update
    }
    return this.af.database.object("/listings/" + listing.id).update(listing) as Promise<void>;
  }

  /**
   * Delete listing by id
   * @param listingId
   */
  removeListing(listingId:string):Promise<void> {
    return this.af.database.object("/listings/" + listingId).remove() as Promise<void>;
  }
}
