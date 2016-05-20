import {Page, NavParams} from "ionic-angular";
import {Listing} from "../../listing";
import {EnumMsgPipe} from "../../enum-msg.pipe";]

@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.html',
  pipes: [EnumMsgPipe]
})
export class ListingDetailPage {
  private listing:Listing;

  /**
   * Based on params or id load a listing page.
   * @param params
   */
  constructor(params:NavParams) {
      this.listing = params.data.listing;
  }
}
