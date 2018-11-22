import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyInteractionApi} from "../../loopbacksdk/services/custom/HsyInteraction";
import {HsyInteraction} from "../../loopbacksdk/models/HsyInteraction";
import {uuid} from "../../util/uuid";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {ListingUxDetailPage} from "./listing-ux-detail.page";
import {FlagService} from "../../services/flag.service";
declare let ga:any;



@Component({
  selector: 'listing-ux-item',
  templateUrl: 'listing-ux-item.comp.html',
})
export class ListingUxItem {
  @Output() onBump = new EventEmitter<HsyListing>();
  @Input() badgeText;
  @Input() listing:HsyListing;
  @Input() indexFromParent:number = 0;

  private placeholderIds = [
    'qfhndxx',
    'ccygytp',
    'yzsmdhz'
  ];
  constructor(private nav:NavController,
              private alertCtrl: AlertController,
              private hsyInteractionApi:HsyInteractionApi,
              private hsyListingApi:HsyListingApi,
              private flagService:FlagService) {
  }


  gotoDetail() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listing-detail',
      eventLabel: 'from-listing-item'
    });
    this.nav.push(ListingUxDetailPage, {listing: this.listing});
  }

  async bump() {
    ga('send', 'event', {
      eventCategory: 'interaction',
      eventAction: 'bump',
    });
    let local = window.localStorage;
    let meId = local['user_id']; // TODO(xinbenlv): use UserService
    let now = new Date();
    let hsyInteraction = <HsyInteraction>{
      uid: uuid(),
      userId: meId,
      type: "BUMP",
      listingId: this.listing.uid,
      interactionTime: now
    };
    this.listing.interactions.push(hsyInteraction);
    this.onBump.emit(this.listing);
    await this.hsyInteractionApi.create(hsyInteraction).toPromise();
    await this.hsyListingApi.updateAttributes(this.listing.uid, {latestUpdatedOrBump: now}).toPromise();
  }
}
