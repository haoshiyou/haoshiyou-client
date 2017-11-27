import {Platform, NavController, AlertController} from "ionic-angular";
import {OnInit, OnDestroy, Component} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {AuthService} from "../../services/auth.service";
import "rxjs/Rx";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import UrlUtil from "../../util/url_util";
import {FlagService} from "../../services/flag.service";
declare let ga:any;
const SEGMENT_KEY: string = 'segment';
const AREA_KEY: string = 'area';
/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'listing-tab',
  templateUrl: 'listings-tab.page.html',
})
export class ListingsTabPage implements OnInit, OnDestroy {
  ngOnDestroy(): any {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

  public segmentModel: string = 'ROOMMATE_WANTED'; // by default for rent
  public areaModel: string = 'All'; // by default for All
  public mapToggleOn: boolean = false;
  public useGrid:boolean = !(navigator.platform == 'iPhone');
  public loadedListings: HsyListing[] = [];
  public isInitLoading = false;
  private map: any; // Actually google.maps.Map;
  private markers: any[]; // Actually google.maps.Marker[];
  private mapReady: boolean = false;
  private currentIndex:number = 0;

  constructor(private platform: Platform,
              private nav: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private api: HsyListingApi,
              private flagService: FlagService) {
  }
  async ngOnInit() {
    let segmentFromUrl = UrlUtil.getParameterByName(SEGMENT_KEY);
    if (segmentFromUrl) {
      this.segmentModel = segmentFromUrl;
    }
    let areaFromUrl = UrlUtil.getParameterByName(AREA_KEY);
    if (areaFromUrl) {
      this.areaModel = areaFromUrl;
    }
    await this.loadMoreListings();
    console.log(`ListingsTabPage init with area=${this.areaModel}, segment=${this.segmentModel}`);
  }

  ionViewWillEnter() {
    ga('set', 'page', '/listings-tab.page.html');
    ga('send', 'pageview');
  }

  //noinspection JSUnusedGlobalSymbols
  async onSegmentModelChange(newValue) {
    this.segmentModel = newValue;
    this.loadedListings = [];
    this.isInitLoading = true;
    await this.loadMoreListings(); // no wait
    this.isInitLoading = false;
    ga('set', 'page', `/listings-tab.page.html#segment-${newValue}`);
    ga('send', 'pageview');
  }

  //noinspection JSUnusedGlobalSymbols
  async onAreaModelChange(newValue) {
    this.areaModel = newValue;
    this.loadedListings = [];
    this.isInitLoading = true;
    await this.loadMoreListings(); // no wait
    this.isInitLoading = false;
    ga('set', 'page', `/listings-tab.page.html#area-${newValue}`);
    ga('send', 'pageview');
  }

  async loadMoreListings() {
    let whereClause = {
      'type': this.segmentModel == 'ROOM_WANTED' ? 1 : 0,
    };

    if (this.areaModel !== 'All') {
      whereClause['hsyGroupEnum'] = this.areaModel;
    } else {
      whereClause['hsyGroupEnum'] = {'nin': ['BigTeam', 'TestGroup', 'None']};
    }
    ga('send', 'event', {
      eventCategory: 'load',
      eventAction: 'load-more-listings',
      eventLabel: `load-more-index-${this.loadedListings.length}`
    });
    let start:number = Date.now();
    let newItems =  await this.api
        .find<HsyListing>({
          // TODO(zzn): use ListTypeEnum when migrated
          where: whereClause,
          order: 'lastUpdated DESC',
          limit: 12,
          offset: this.loadedListings.length,
        })
        .take(1)
        .toPromise();
    let end:number = Date.now();
    ga('send', {
      hitType: 'timing',
      timingCategory: 'API Call',
      timingVar: 'load-more-listings',
      timingValue: end-start
    });
    for (let item of newItems) {
      this.loadedListings.push(item);
    }
  }



  private updateMarkers() {
    // TODO(xinbenlv): update markers
  }

  async fakeGoToCreationPage() {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listing-creation',
    });
    let alert = this.alertCtrl.create({
      title: '新版app中发帖功能正在建设中',
      buttons: [
        {
          text: 'OK',
        },
      ]
    });
    await alert.present();
  }

  async goToCreationPage() {
    if (this.auth.authenticated()) {
      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      this.nav.push(CreationPage);
    } else {
      let alert = this.alertCtrl.create({
        title: '请登录后发帖',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '登陆',
            handler: () => {
              this.auth.login();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async doInfinite(infiniteScroll) {
    await this.loadMoreListings();
    infiniteScroll.complete();
  }

  public isDebug():boolean {
    return this.flagService.getFlag('debug');
  }
  public options = [
        'All',
        'SanFrancisco',
        'MidPeninsula',
        'SouthBayWest',
        'SouthBayEast',
        'EastBay',
        'ShortTerm',
        'Seattle',
        'TestGroup',
      ];
  public optionsMap =
      {
        'All': '全部',
        'SanFrancisco': '三番',
        'MidPeninsula': '中半岛',
        'SouthBayWest': '南湾西',
        'SouthBayEast': '南湾东',
        'EastBay': '东湾',
        'ShortTerm': '短租',
        'Seattle': '西雅图',
        'TestGroup': '测试',
      };

  // Hack introduced due to this issue: https://github.com/ionic-team/ionic/issues/6923
  public async setOption(index, event) {
    if (this.options[index] != null) {
      this.areaModel = this.options[index];
      await this.onAreaModelChange(this.areaModel);
      //note you have to use "tap" or "click" - if you bind to "ionSelected" you don't get the "target" property
      let segments = event.target.parentNode.children;
      let len = segments.length;
      for (let i = 0; i < len; i++) {
        segments[i].classList.remove('segment-activated');
      }
      event.target.classList.add('segment-activated');
    }
  }
}
