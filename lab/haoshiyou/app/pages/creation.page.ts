import {Page, Platform} from 'ionic-angular';
import { ListingService } from '../listing.service';

/**
 *  Google Maps API
 */
declare let google: any;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/creation.page.html',
  providers: [ListingService]
})
export class CreationPage {
  save() {

  }
}
