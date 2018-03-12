import {Platform} from "ionic-angular";
import {TabsPage} from "../pages/tabs/tabs";
import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "../services/auth.service";
import 'rxjs/Rx'; // used by Observable.take()
import {Env} from "./env";
import {LoopBackConfig} from "../loopbacksdk/lb.config";
import {HsyListing} from "../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../loopbacksdk/services/custom/HsyListing";
import { CodePush } from '@ionic-native/code-push';
import UrlUtil from "../util/url_util";
declare let ga:any;
@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})

export class HaoshiyouApp {
  rootPage:any = TabsPage;
  private hsyListing:HsyListing = new HsyListing();

  constructor(private platform:Platform,
              private authService:AuthService,
              private http:Http,
              private hsyListingApi:HsyListingApi,
              private codePush: CodePush) {
    LoopBackConfig.setBaseURL(Env.configHaoshiyouServer.serverUrl);
    LoopBackConfig.setApiVersion('api');
    this.platform.ready().then(()=> {
      if (this.platform.is(`cordova`)){
        this.codePush.sync().subscribe((syncStatus) => console.log(syncStatus));
        let downloadProgress = (progress) => { console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`); };
        this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
      }
      ga('create', Env.configGoogleAnalytics.propertyId, {'alwaysSendReferrer': true});
      let referrer = UrlUtil.getParameterByName('referrer');
      if(referrer) {
        ga('set', 'campaignName', referrer);
        ga('set', 'referrer', referrer);
      } else {
        ga('set', 'campaignName', '(direct)');
        ga('set', 'referrer', referrer);
      }
      ga('set', 'checkProtocolTask', null
          // function(a) {
          //   console.log(`Skipping checkProtocolTask, parameters= ${JSON.stringify(a, null, '\t')}`);
          // }
      );
      ga('send', 'event', {
        eventCategory: 'app-live-cycle',
        eventAction: 'start-app',
      });

    });

  }
}

