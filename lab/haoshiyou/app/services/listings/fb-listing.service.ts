import {Listing, ListingId} from "../../models/listing";
import {IListingService} from "./listing.service";
import {Injectable} from "@angular/core";
import {AngularFire} from "angularfire2/angularfire2";

@Injectable()
export class FirebaseListingService implements IListingService {
  constructor(private af:AngularFire) {
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
    if (listing.id) return this.af.database.object("/listings/" + listing.id).update(listing);
    else return this.af.database.list("/listings").push(listing);
  }
}