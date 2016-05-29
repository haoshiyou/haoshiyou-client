import {Page, NavParams} from "ionic-angular";
import {Listing} from "../../models/listing";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe.ts";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";

@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.page.html',
  pipes: [EnumMsgPipe, TimeFromNowPipe]
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
