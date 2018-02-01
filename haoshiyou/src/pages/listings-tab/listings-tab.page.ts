import {Platform, NavController, AlertController, Content, PopoverController, Col, Popover} from "ionic-angular";
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
import {GeoPoint} from "../../loopbacksdk/models/BaseModels";
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
    if (this.markers)
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
  private map: any; // Actually google.maps.Map;
  private markers: any[]; // Actually google.maps.Marker[];
  private mapReady: boolean = false;
  private currentIndex:number = 0;
  private filterSettings = {'types': {}, 'areas': {}, 'duration': {}};
  private whereClause = {};
  private isLoading = false;
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
    this.updateWhereClause();
    await this.loadMoreListings();
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

    await this.initLoad();
    ga('set', 'page', `/listings-tab.page.html#segment-${newValue}`);
    ga('send', 'pageview');
  }

  //noinspection JSUnusedGlobalSymbols
  async onAreaModelChange(newValue) {
    this.areaModel = newValue;
    await this.initLoad();
    ga('set', 'page', `/listings-tab.page.html#area-${newValue}`);
    ga('send', 'pageview');
  }

  async loadMoreListings() {
    this.isLoading = true;
    ga('send', 'event', {
      eventCategory: 'load',
      eventAction: 'load-more-listings',
      eventLabel: `load-more-index-${this.loadedListings.length}`
    });
    let start:number = Date.now();

    // southwest: 37.148070, -122.852249
    // northeast: 38.072739, -121.473969

    let newItems:HsyListing[] =  await this.api
        .find<HsyListing>({
          // TODO(zzn): use ListTypeEnum when migrated
          where: this.whereClause,
          order: 'latestUpdatedOrBump DESC',
          limit: 24,
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
    this.mapView.addListings(newItems);
    this.isLoading = false;
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
    let popover:Popover = this.popoverCtrl.create(
        FilterSettingsComponent,
        {'filterSettings': this.filterSettings},
        {});
    await popover.onDidDismiss(async (data) => {
      console.log(`--- received ` + JSON.stringify(data));
      if (data !== undefined && data !== null) {
        this.filterSettings = data["filterSettings"];
      } else if (this.popoverCtrl['_app'].filterSettings) {
        this.filterSettings = this.popoverCtrl['_app']/*a hack to access private */.filterSettings;
      }
      this.updateWhereClause();
      await this.initLoad();
    });
    await popover.present({
      ev: myEvent
    });
  }

  private updateWhereClause() {
    /* START filtering type */
    let type = this.getType(this.filterSettings['types']['zhaozu'],
                            this.filterSettings['types']['qiuzu']);
    let whereClause_ = {};
    if (type == 0) {
      whereClause_['listingTypeEnum'] = 'NeedRoommate';
    } else if (type == 1) {
      whereClause_['listingTypeEnum'] = 'NeedRoom';
    } else {
      delete whereClause_['listingTypeEnum'];
    }
    /* END filtering type */
    /* START filtering duration */
    let ago = null;
    switch (this.filterSettings['duration']) {
      case '最近3天':
        ago = new Date(new Date().getTime() - (3 * 24 * 60 * 60 * 1000));
        break;
      case '最近7天':
        ago = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
      case '最近30天':
        ago = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
      case '最近90天':
        ago = new Date(new Date().getTime() - (90 * 24 * 60 * 60 * 1000));
        break;
      case '不限': // fall though
      default:
        // do nothing
    }
    if(ago) whereClause_['lastUpdated'] = { "gte": ago};
    /* END filtering duration */
    /* START filtering price */
    if (this.filterSettings['price']) {
      whereClause_['price'] = {lt: this.filterSettings['price']};
    } else {
      delete whereClause_['price'];
    }
    /* END filtering price */

    /* START filtering area */
    let allArea = this.filterSettings['areas']["All"];
    if (allArea !== undefined && allArea === true) {
      whereClause_['hsyGroupEnum'] = {'nin': ['BigTeam', 'TestGroup', 'None']};
    } else {
      let areaClause = [];
      for (let area in this.filterSettings['areas']) {
        let selected = this.filterSettings['areas'][area];
        if (selected !== undefined && selected) {
          areaClause.push(area);
        }
      }
      if (areaClause.length > 0) whereClause_['hsyGroupEnum'] = {'inq': areaClause};
    }
    /* END filtering area */

    /* EXEC filtering */
    this.whereClause = whereClause_;
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
    if (value == "ONLY_MAP") {
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

  public async onBoundaryFilter(boundary) {
    let latMax = boundary.getNorthEast().lat();
    let latMin = boundary.getSouthWest().lat();
    let lngMax = boundary.getNorthEast().lng();
    let lngMin = boundary.getSouthWest().lng();
    this.whereClause['and']  = [
      {'location_lat': { 'lt': latMax }},
      {'location_lat': { 'gt': latMin }},
      {'location_lng': { 'lt': lngMax }},
      {'location_lng': { 'gt': lngMin }},
    ];
    await this.initLoad();
  }
  private async initLoad() {
    this.loadedListings = [];
    this.mapView.clearMarkers();
    await this.loadMoreListings();
  }
}
