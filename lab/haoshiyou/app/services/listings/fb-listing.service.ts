import {Listing, ListingId} from "../../models/listing";
import {IListingService} from "./listing.service";
import {Injectable, Inject} from "@angular/core";
import {AngularFire} from "angularfire2/angularfire2";
import {loggerToken} from "../log.service";
import {Logger} from "log4javascript/log4javascript";

@Injectable()
export class FirebaseListingService implements IListingService {
  constructor(private af:AngularFire, @Inject(loggerToken) private logger:Logger) {
  }

  /**
   * Get a list of listing, by default it should sort by date desc.
   */
  getListings():Promise<Listing[]> {
    let fo = this.af.database.list("/listings").take(1);
    return fo.toPromise();
  }

  /**
   * Get a listing by its id
   * @param id
   */
  getListingById(id:ListingId):Promise<Listing> {
    return this.af.database.object("/listings/" + id).take(1).toPromise();
  }

  /**
   * Add a listing to the all listings.
   * @param listing: the value of listing for creation.
   */
  createListing(listing:Listing):Promise<void> {
    this.logger.debug(`Create or saving ${JSON.stringify(listing)}`);
    if (listing.id) {
      this.logger.assert(listing.id == listing["$key"]);
      delete  listing["$key"]; // strip $key before update
      return this.af.database.object("/listings/" + listing.id).update(listing);
    }
    else return this.af.database.list("/listings").push(listing);
  }
}