import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";
import { CookieService } from 'ngx-cookie-service';
declare let ga:any;

@Component({
  selector: 'qrcode-tab',
  templateUrl: 'qrcode-tab.page.html',
})
export class QrCodeTabPage {
  constructor(
      public params: NavParams,
      private viewCtrl:ViewController,
      private cookie:CookieService) {
    console.log(params);
  }

  async dismiss() {
    this.viewCtrl.dismiss();
    let expireDate = new Date();
    let numberOfDaysToAdd = 7;
    expireDate.setDate(expireDate.getDate() + numberOfDaysToAdd);
    this.cookie.set("hasShownQrCodeModal", 'true', expireDate);
  }

  public shouldShowQrCode:boolean = false;

  ionViewWillEnter() {
    ga('set', 'page', '/qrcode-tab.page.html');
    ga('send', 'pageview');
  }

  public showQrCode() {
    ga('send', 'event', {
      eventCategory: 'show-qrcode',
      eventAction: 'qrcode-tab',
    });
    this.shouldShowQrCode = true;
  }
}
