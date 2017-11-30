import {AuthService} from "../../services/auth.service";
import {Component, OnInit} from "@angular/core";
import {Env} from "../../app/env";
import {CodePush} from "@ionic-native/code-push";
import {Platform, ToastController} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";
import {FlagService} from "../../services/flag.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
declare let window:any;
declare let ga:any;
@Component({
  templateUrl: 'mine-tab.page.html'
})
export class MineTabPage implements OnInit {

  public flagNames = null;
  public listings:HsyListing[] = [];
  constructor(
      public auth:AuthService,
      private codePush:CodePush,
      private platform:Platform,
      public appVersion:AppVersion,
      private toastCtr:ToastController,
      private flagService:FlagService,
      private api: HsyListingApi,
  ) {
    let flags = flagService.getAllFlags();
    this.flagNames = Object.keys(flags);
  }

  async ionViewWillAppear() {

    console.log(`XXX ngOnInit inside of MineTab`);
    ga('set', 'page', '/mine-tab.page.html');
    ga('send', 'pageview');
    console.log(`Appear!`);
    await this.loadMyListings();
  }
  async loadMyListings(): Promise<void> {
    let local = window.localStorage;
    let meId = local['user_id']; // TODO(xinbenlv): use UserService
    if (!meId) {
      console.log(`XXX No MeId!`);
      return; // not logged in ;
    } else {
      console.log(`XXX MeId = ${meId}!`);
    }
    let whereClause = {
      'ownerId': meId,
    };
    ga('send', 'event', {
      eventCategory: 'load',
      eventAction: 'load-my-listings',
    });
    let start:number = Date.now();
    console.log(`XXX start loading!: whereClause = ${whereClause}`);
    let newItems =  await this.api
        .find<HsyListing>({
          where: whereClause,
        })
        .toPromise();
    console.log(`XXX newItems = ${JSON.stringify(newItems, null, " ")}`);
    let end:number = Date.now();
    ga('send', {
      hitType: 'timing',
      timingCategory: 'API Call',
      timingVar: 'load-my-listings',
      timingValue: end-start
    });
    this.listings = newItems;
  };
  async ngOnInit(): Promise<void> {
    console.log(`XXX ngOnInit inside of MineTab`);
    await this.loadMyListings();
  }

}
