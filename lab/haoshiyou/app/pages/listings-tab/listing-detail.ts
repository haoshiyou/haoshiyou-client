import {Page, NavParams} from "ionic-angular";
import {Listing, ListingId} from "../../listing";
import {EnumMsgPipe} from "../../enum-msg.pipe";
import {ListingService, MockListingService} from "../../listing.service";
import {provide} from "angular2/core";

@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.html',
  providers:[ provide(ListingService, {useClass: MockListingService})],
  pipes: [EnumMsgPipe]
})
export class ListingDetailPage {
  private listing:Listing;

  /**
   * Based on params or id load a listing page.
   * @param listingService
   * @param params
   * @param id
   */
  constructor(private listingService:ListingService,
              params?:NavParams, id?:ListingId) {

    if (params && params.data && params.data.listing) {
      this.listing = params.data.listing;
    } else if (id) {
      listingService.getListingById(id).then(listing => this.listing = listing);
    } else {
      throw "No valid listing passed in";
    }
  }
}
