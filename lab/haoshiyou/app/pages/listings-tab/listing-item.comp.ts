import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {ListingDetailPage} from "./listing-detail.page";
import {TimeFromNowPipe} from "../../pipes/time-from-now.pipe";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe";

@Component({
  selector: 'listing-item',
  templateUrl: 'build/pages/listings-tab/listing-item.comp.html',
  pipes: [TimeFromNowPipe, EnumMsgPipe]
})
export class ListingItem {
  @Input() listing:Listing;

  constructor(private nav:NavController) {
  }

  gotoDetail() {
    this.nav.push(ListingDetailPage, {listing: this.listing});
  }
}
