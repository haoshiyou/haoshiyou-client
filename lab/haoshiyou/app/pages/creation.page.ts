import {Page} from "ionic-angular";
import {ListingService, MockListingService} from "../listing.service";
import {provide} from "angular2/core";

/**
 *  Google Maps API
 */
declare let google:any;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/creation.page.html',
  providers: [provide(ListingService, {useClass: MockListingService})]
})
export class CreationPage {
  save() {

  }
}
