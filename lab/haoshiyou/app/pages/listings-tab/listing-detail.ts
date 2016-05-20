import {Page, NavParams} from 'ionic-angular';
import { Listing } from '../../listing';
import {EnumMsgPipe} from '../../enum-msg.pipe';

@Page({
  templateUrl: 'build/pages/listings-tab/listing-detail.html',
  pipes: [EnumMsgPipe]
})
export class ListingDetailPage {
  private listing: Listing;
  constructor(params: NavParams) {
    this.listing = params.data.listing;
  }
}
