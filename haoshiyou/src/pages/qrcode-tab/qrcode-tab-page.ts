import {Component} from "@angular/core";
declare let ga:any;

@Component({
  selector: 'qrcode-tab',
  templateUrl: 'qrcode-tab.page.html',
})
export class QrCodeTabPage {
  public shouldShow:boolean = false;

  ionViewWillEnter() {
    ga('set', 'page', '/qrcode-tab.page.html');
    ga('send', 'pageview');
  }

  public showQrCode() {
    ga('send', 'event', {
      eventCategory: 'show-qrcode',
      eventAction: 'qrcode-tab',
    });
    this.shouldShow = true;
  }
}
