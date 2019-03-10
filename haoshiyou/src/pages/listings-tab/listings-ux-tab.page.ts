import {
  Platform, NavController, AlertController, Content, PopoverController, ModalController
} from "ionic-angular";
import {OnDestroy, Component, ViewChild, ChangeDetectorRef,
  ElementRef, AfterViewInit, HostListener
} from "@angular/core";
import {CreationPage} from "./listing-creation.page";
import {AuthService} from "../../services/auth.service";
import "rxjs/Rx";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import UrlUtil from "../../util/url_util";
import {FlagService} from "../../services/flag.service";
import {MapViewComponent} from "./map-view.comp";
import {FilterSettingsPage} from "./filter-settings.page";
import {UxPrimaryCreationPage} from "./creation/ux-primary-creation.page";
import {QrCodeTabPage} from "../qrcode-tab/qrcode-tab-page";
import { CookieService } from 'ngx-cookie-service';
declare let ga:any;
declare let google, document;
declare let $; // jQuery

const SEGMENT_KEY: string = 'segment';
const AREA_KEY: string = 'area';
const HSY_GROUP_AREAS = ['南湾西', '南湾东', '中半岛', '三番', '东湾'];
const BAY_AREA_CITIES = ["Mountain View", "San Francisco",
  "Alameda","El Cerrito","San Leandro","Albany","Emeryville","Napa","San Mateo","American Canyon","Fairfax","Newark","San Pablo","Antioch","Fairfield","Novato","San Rafael","Atherton","Foster City","Oakland","San Ramon","Belmont","Fremont","Oakley","Santa Clara","Belvedere","Gilroy","Orinda","Santa Rosa","Benicia","Half Moon Bay","Pacifica","Saratoga","Berkeley","Hayward","Palo Alto","Sausalito","Brentwood","Healdsburg","Petaluma","Sebastopol","Brisbane","Hercules","Piedmont","Sonoma","Burlingame","Hillsborough","Pinole","South San Francisco","Calistoga","Lafayette","Pittsburg","St. Helena","Campbell","Larkspur","Pleasant Hill","Suisun City","Clayton","Livermore","Pleasanton","Sunnyvale","Cloverdale","Los Altos","Portola Valley","Tiburon","Colma","Los Altos Hills","Redwood City","Union City","Concord","Los Gatos","Richmond","Vacaville","Corte Madera","Martinez","Rio Vista","Vallejo","Cotati","Menlo Park","Rohnert Park","Walnut Creek","Cupertino","Mill Valley","Ross","Windsor","Daly City","Millbrae","San Anselmo","Woodside","Danville","Milpitas","San Bruno","Yountville","Dixon","Monte Sereno","San Carlos","Dublin","Moraga","East Palo Alto","Morgan Hill","San Jose", // From http://www.bayareacensus.ca.gov/cities/cities.htm
  "Stanford",
];

let locationsForSearch = HSY_GROUP_AREAS.concat(BAY_AREA_CITIES);

/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'listing-ux-tab',
  templateUrl: 'listings-ux-tab.page.html',
})
export class ListingsUxTabPage implements AfterViewInit, OnDestroy {
  private isSearching = false;

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
  @ViewChild('splitPanelContainer') private splitPanelContainer: ElementRef;
  public segmentModel: string = 'ROOMMATE_WANTED'; // by default for rent
  public areaModel: string = 'All'; // by default for All
  public useGrid:boolean = !(navigator.platform == 'iPhone');
  public loadedListings: HsyListing[] = [];
  public stickyListings: HsyListing[] = [];
  private map: any; // Actually google.maps.Map;
  private markers: any[]; // Actually google.maps.Marker[];
  private mapReady: boolean = false;
  private currentIndex:number = 0;
  private filterSettings = {'types': {}, 'areas': {}, 'duration': 0, 'price': {lower: 0, upper: 5000}};
  private whereClause = {};
  private isLoading = false;
  private showMapInstead:boolean = false;
  private largeEnoughWas:boolean;
  private searchItemsFiltered = locationsForSearch.slice(0, 7);
  public searchBarModel;
  constructor(private platform: Platform,
              private nav: NavController,
              private alertCtrl: AlertController,
              private auth: AuthService,
              private api: HsyListingApi,
              private flagService: FlagService,
              public popoverCtrl: PopoverController,
              private ref:ChangeDetectorRef,
              private modalCtrl:ModalController,
              private cookie:CookieService) {
  }
  async ngAfterViewInit() {
    let segmentFromUrl = UrlUtil.getParameterByName(SEGMENT_KEY);
    if (segmentFromUrl) {
      this.segmentModel = segmentFromUrl;
    }
    let areaFromUrl = UrlUtil.getParameterByName(AREA_KEY);
    if (areaFromUrl) {
      this.areaModel = areaFromUrl;
    }
    this.updateWhereClause();
    await this.loadStickyListings();
    await this.loadMoreListings();
    this.updateLayout();

    let hasShownQrCodeModal = this.cookie.get("hasShownQrCodeModal");
    console.log('hasShownQrCodeModal', hasShownQrCodeModal);
    if (!hasShownQrCodeModal) {
      this.presentQrCodeModal();
    }
  }

  presentQrCodeModal() {
    let m = this.modalCtrl.create(QrCodeTabPage, {isModal: true});
    m.present();
  }

  ionViewDidEnter() {
    ga('set', 'page', '/listings-ux-tab.page.html');
    ga('send', 'pageview');
    this.ref.markForCheck();
  }

  //noinspection JSUnusedGlobalSymbols
  async onSegmentModelChange(newValue) {
    this.segmentModel = newValue;

    await this.initLoad();
    ga('set', 'page', `/listings-ux-tab.page.html#segment-${newValue}`);
    ga('send', 'pageview');
  }

  //noinspection JSUnusedGlobalSymbols
  async onAreaModelChange(newValue) {
    this.areaModel = newValue;
    await this.initLoad();
    ga('set', 'page', `/listings-ux-tab.page.html#area-${newValue}`);
    ga('send', 'pageview');
  }

  async loadStickyListings() {
    // TODO: this is very hacky but let's just refactor later
    $.get( `http://0.0.0.0:3000/GetStickyListings` /* TODO(xinbenlv): update URL to point to prod important */, async data => {
      console.log(`Sticky`, data);
      console.log(`Sticky array`, data.map(item=>item.listingId));
      let l = await this.api.find<HsyListing>({
        where: {uid: { inq: data.map(item=>item.listingId)}}
      }).take(1).toPromise();
      console.log(`XXX loadStickyListings`, l, data);
      this.stickyListings = l;
    });
  };

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
    setTimeout(this.mapView.addListings(newItems), 2000);
    this.isLoading = false;
  }

  private updateMarkers() {
    // TODO(xinbenlv): update markers
  }

  async goToCreationPage() {
    if (this.auth.authenticated()) {
      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      if (this.flagService.getFlag( 'newUx')) {
        this.nav.push(UxPrimaryCreationPage);
      } else {
        this.nav.push(CreationPage);
      }
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

  public async gotoFilterSettingsPage(_) {
    let ret = await this.nav.push(
        FilterSettingsPage,
        {
          filterSettings: this.filterSettings ,
          callback: async (data) => {
            this.filterSettings = data;
            this.updateWhereClause();
            await this.initLoad();
          },
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
    if (this.filterSettings['duration'] != 0) {
      ago = new Date(new Date().getTime() - (this.filterSettings['duration'] * 24 * 60 * 60 * 1000));
    }
    if(ago) whereClause_['lastUpdated'] = { "gte": ago};
    else delete whereClause_['lastUpdated'];
    /* END filtering duration */
    /* START filtering price */
    if (this.filterSettings['price']) {
      if (this.filterSettings['price'].upper)
        whereClause_['price'] = {lt: this.filterSettings['price'].upper};
      if (this.filterSettings['price'].lower)
        whereClause_['price'] = {gte: this.filterSettings['price'].lower};
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

    /* START filtering with geo bounds */
    if (this.filterSettings['boundary']) {
      let boundary = this.filterSettings['boundary'];
      let latMax = boundary.getNorthEast().lat();
      let latMin = boundary.getSouthWest().lat();
      let lngMax = boundary.getNorthEast().lng();
      let lngMin = boundary.getSouthWest().lng();
      whereClause_['and'] = [
        {'location_lat': {'lt': latMax}},
        {'location_lat': {'gt': latMin}},
        {'location_lng': {'lt': lngMax}},
        {'location_lng': {'gt': lngMin}},
      ];
    }

    /* END filtering with geo bounds */

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
    return window.innerWidth > 1200;
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize() {
    if (this.largeEnoughWas != this.largeEnough()) {
      this.updateLayout();
      this.largeEnoughWas = this.largeEnough();
    }
  }

  public flipMapAndList() {
    this.showMapInstead = !this.showMapInstead;
    this.updateLayout();
  }
  public updateLayout() {
    if (!this.largeEnough()) {
      if (this.showMapInstead) {
        this.splitPanelContainer.nativeElement.style.gridTemplateColumns = '1fr 0px';
      } else {
        this.splitPanelContainer.nativeElement.style.gridTemplateColumns ='0px 1fr';
      }
    } else {
      this.splitPanelContainer.nativeElement.style.gridTemplateColumns ='1fr minmax(30%, 600px)';
    }
    this.mapView.render();
  }

  public async onBoundaryFilter(boundary) {
    if (boundary) {
      this.filterSettings['boundary'] = boundary;
      this.filterSettings['areas'] = {};
    } else {
      delete this.filterSettings['boundary'];
    }
    this.updateWhereClause();
    await this.initLoad();
  }
  private async initLoad() {
    this.loadedListings = [];
    this.mapView.clearMarkers();
    await this.loadMoreListings();
  }

  public filterItems(ev: any) {
    // Reset items back to all of the items
    this.searchItemsFiltered = locationsForSearch.slice(0,5);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchItemsFiltered = (locationsForSearch.filter((item) => {
        return item.indexOf(val) > -1 || item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })).slice(0,20)
    }

  }

  public async setSearchTerm(searchItem) {
    this.searchBarModel = searchItem;
    this.isSearching = false;
    this.isLoading = true;
    if (HSY_GROUP_AREAS.indexOf(this.searchBarModel) >= 0) {
      for (let option of this.options) {
        if (this.optionsMap[option] == this.searchBarModel) {
          this.filterSettings['areas'] = {};
          this.filterSettings['areas'][option] = true;
          this.onBoundaryFilter(null);
          this.updateWhereClause();
          await this.initLoad();
        }
      }
      // Fetch by group
    } else if (BAY_AREA_CITIES.indexOf(this.searchBarModel) >= 0) {
      // Fetch by city
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode( { 'address': this.searchBarModel}, async (results, status) => {
        if (status == 'OK') {
          await this.onBoundaryFilter(results[0].geometry.bounds);
        } else {
          console.warn('Geocode was not successful for the following reason: ', status);
        }
      });

    } else {
      // Do something else?
    }
  }
}
