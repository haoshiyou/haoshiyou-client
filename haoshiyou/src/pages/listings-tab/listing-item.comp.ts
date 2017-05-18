import {Component, Input} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {ListingDetailPage} from "./listing-detail.page";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
declare let ga:any;

@Component({
  selector: 'listing-item',
  templateUrl: 'listing-item.comp.html',
})
export class ListingItem {
  @Input() listing:HsyListing;

  constructor(private nav:NavController,
              private alertCtrl: AlertController) {
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
    let alert = this.alertCtrl.create({
      title: '顶起功能还在建设',
      buttons: [
        {
          text: 'OK',
        },
      ]
    });
    await alert.present();
  }
}
