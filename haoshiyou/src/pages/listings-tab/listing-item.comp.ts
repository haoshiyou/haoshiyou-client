import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {ListingDetailPage} from "./listing-detail.page";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
declare let ga:any;

@Component({
  selector: 'listing-item',
  templateUrl: 'listing-item.comp.html',
})
export class ListingItem {
  @Input() listing:HsyListing;

  constructor(private nav:NavController) {
  }

  gotoDetail() {
    ga('send', 'view-listing-detail');
    this.nav.push(ListingDetailPage, {listing: this.listing});
  }
}
