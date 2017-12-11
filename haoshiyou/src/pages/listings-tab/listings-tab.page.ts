import {Platform, NavController, AlertController, Content, PopoverController, Col} from "ionic-angular";
import {
  OnInit, OnDestroy, Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef,
  ElementRef
} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {AuthService} from "../../services/auth.service";
import "rxjs/Rx";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import UrlUtil from "../../util/url_util";
import {FlagService} from "../../services/flag.service";
import {FilterSettingsComponent} from "./filter-settings.comp";
import {MapViewComponent} from "./map-view.comp";
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
  @ViewChild(Content) content: Content;
  @ViewChild(MapViewComponent) private mapView: MapViewComponent;
  @ViewChild('mapContainerCol') private mapContainerCol: ElementRef;
  @ViewChild('listContainerCol') private listContainerCol: ElementRef;
  public segmentModel: string = 'ROOMMATE_WANTED'; // by default for rent
  public areaModel: string = 'All'; // by default for All
  public useGrid:boolean = !(navigator.platform == 'iPhone');
  public loadedListings: HsyListing[] = [];
  public isInitLoading = false;
  private map: any; // Actually google.maps.Map;
  private markers: any[]; // Actually google.maps.Marker[];
  private mapReady: boolean = false;
  private currentIndex:number = 0;
  private filterSettings = {'types': {}, 'areas': {}};
  private whereClause = {};
  private mapOrList = 'ONLY_LIST';
  constructor(private platform: Platform,
              private nav: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private api: HsyListingApi,
              private flagService: FlagService,
              public popoverCtrl: PopoverController,
              private ref:ChangeDetectorRef) {
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
    if (this.largeEnough()) {
      this.mapOrList = 'BOTH';
    } else this.mapOrList = 'ONLY_LIST';
    this.updateMapOrList(this.mapOrList);
  }

  ionViewDidEnter() {
    ga('set', 'page', '/listings-tab.page.html');
    ga('send', 'pageview');
    this.ref.markForCheck();
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
    ga('send', 'event', {
      eventCategory: 'load',
      eventAction: 'load-more-listings',
      eventLabel: `load-more-index-${this.loadedListings.length}`
    });
    let start:number = Date.now();
    let newItems =  await this.api
        .find<HsyListing>({
          // TODO(zzn): use ListTypeEnum when migrated
          where: this.whereClause,
          order: 'latestUpdatedOrBump DESC',
          limit: 120,
          offset: this.loadedListings.length,
          include: ['interactions', 'owner'],
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
    this.ref.markForCheck();
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

  public async bumpUpdateOrder(hsyListing:HsyListing) {
    for (let i = 0; i < this.loadedListings.length; i++) {
      let bumpedListing = hsyListing;
      if (this.loadedListings[i] == bumpedListing) {
        await this.content.scrollToTop();
        this.loadedListings.splice(i, 1);
        this.loadedListings.unshift(bumpedListing);
        break;
      }
    }
  }

  public async popoverFilter(myEvent) {
    let popover = this.popoverCtrl.create(
        FilterSettingsComponent,
        {'filterSettings': this.filterSettings},
        {});
    await popover.onDidDismiss((data) => {
      console.log(`--- received ` + JSON.stringify(data));
      if (data !== undefined && data !== null) {
        this.filterSettings = data["filterSettings"];
        this.submitNewFiltering(this.filterSettings);
      }
    });
    await popover.present({
      ev: myEvent
    });
  }

  async submitNewFiltering(filterSettings_: {}) {
    /* START filtering type */
    let type = this.getType(filterSettings_['types']['zhaozu'],
                            filterSettings_['types']['qiuzu']);
    let whereClause_ = {};
    if (type == 0) {
      whereClause_['listingTypeEnum'] = 'NeedRoommate';
    } else if (type == 1) {
      whereClause_['listingTypeEnum'] = 'NeedRoom';
    }
    /* END filtering type */

    /* START filtering area */
    let allArea = filterSettings_['areas']["All"];
    if (allArea !== undefined && allArea === true) {
      whereClause_['hsyGroupEnum'] = {'nin': ['BigTeam', 'TestGroup', 'None']};
    } else {
      let areaClause = [];
      for (let area in filterSettings_['areas']) {
        let selected = filterSettings_['areas'][area];
        if (selected !== undefined && selected) {
          areaClause.push(area);
        }
      }
      whereClause_['hsyGroupEnum'] = {'inq': areaClause};
    }
    /* END filtering area */

    /* EXEC filtering */
    console.log('whereClause_: ' + JSON.stringify(whereClause_));
    this.whereClause = whereClause_;
    let filterResult = await this.api.find<HsyListing>(
        {
          where: this.whereClause,
          order: 'latestUpdatedOrBump DESC',
          limit: 12,
          offset: 0,
          include: ['interactions', 'owner'],
        })
        .toPromise();
    this.loadedListings = [];
    for (let item of filterResult) {
      this.loadedListings.push(item);
    }
  }

  private getType(zhaozu: boolean, qiuzu: boolean) {
    if (zhaozu === undefined || !zhaozu) {
      zhaozu = false;
    }
    if (qiuzu === undefined || !qiuzu) {
      qiuzu = false;
    }
    if (zhaozu && !qiuzu) {
      return 0;
    }
    if (!zhaozu && qiuzu) {
      return 1;
    }
    return -1;
  }

  public largeEnough():boolean { // XXX this is a hack, use Bootstrap of Ionic's Grid System to make it work
    return window.innerWidth > 600;
  }

  public updateMapOrList(value) {
    console.log(`XXX updateMapOrList value = ${value}`);
    if (value == "BOTH") {
      this.listContainerCol.nativeElement.setAttribute('style', 'display:block;');
      this.mapContainerCol.nativeElement.setAttribute('style', 'display:block;');
      this.listContainerCol.nativeElement.className = 'half-width';
      this.mapContainerCol.nativeElement.className = 'half-width';
    } else if (value == "ONLY_MAP") {
      this.listContainerCol.nativeElement.setAttribute('style', 'display:none;');
      this.mapContainerCol.nativeElement.setAttribute('style', 'display:block;');
      this.mapContainerCol.nativeElement.className = 'full-width';
    } else if (value == "ONLY_LIST") {
      this.listContainerCol.nativeElement.setAttribute('style', 'display:block;');
      this.mapContainerCol.nativeElement.setAttribute('style', 'display:none;');
      this.listContainerCol.nativeElement.className = 'full-width';
    }
    this.mapView.render();
  }
}
