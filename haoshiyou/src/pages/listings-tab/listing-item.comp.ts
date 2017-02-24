import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {ListingDetailPage} from "./listing-detail.page";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";

@Component({
  selector: 'listing-item',
  templateUrl: 'listing-item.comp.html',
})
export class ListingItem {
  @Input() listing:HsyListing;

  constructor(private nav:NavController) {
  }

  gotoDetail() {
    console.log("XXX Before going to details");
    this.nav.push(ListingDetailPage, {listing: this.listing});
    console.log("XXX After going to details");
  }
}
