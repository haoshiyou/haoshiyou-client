import {Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Listing} from "../../models/listing";
import {ListingDetailPage} from "./listing-detail.page";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'listing-item',
  templateUrl: 'build/pages/listings-tab/listing-item.comp.html',
  pipes: [DatePipe]
})
export class ListingItem {
  @Input() listing:Listing;

  constructor(private nav:NavController) {
  }

  gotoDetail() {
    this.nav.push(ListingDetailPage, {listing: this.listing});
  }
}
