import {Page} from "ionic-angular";
import {ListingService, MockListingService} from "../../services/listing.service.ts";
import {provide} from "@angular/core";

/**
 *  Google Maps API
 */
declare let google:any;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/listings-tab/listing-creation.page.html',
  providers: [provide(ListingService, {useClass: MockListingService})]
})
export class CreationPage {
  save() {

  }
}
