import {Component, Input} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {ListingDetailPage} from "./listing-detail.page";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyInteractionApi} from "../../loopbacksdk/services/custom/HsyInteraction";
import {HsyInteraction} from "../../loopbacksdk/models/HsyInteraction";
import {uuid} from "../../util/uuid";
declare let ga:any;

@Component({
  selector: 'listing-item',
  templateUrl: 'listing-item.comp.html',
})
export class ListingItem {
  @Input() listing:HsyListing;
  constructor(private nav:NavController,
              private alertCtrl: AlertController,
              private hsyInteractionApi:HsyInteractionApi) {
  }

  gotoDetail() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listing-detail',
    });
    this.nav.push(ListingDetailPage, {listing: this.listing});
  }

  async bump() {
    ga('send', 'event', {
      eventCategory: 'interaction',
      eventAction: 'bump',
    });
    let local = window.localStorage;
    let meId = local['user_id']; // TODO(xinbenlv): use UserService

    let hsyInteraction = <HsyInteraction>{
      uid: uuid(),
      userId: meId,
      type: "BUMP",
      listingId: this.listing.uid
    };
    await this.hsyInteractionApi.create(hsyInteraction).toPromise();
  }
}
