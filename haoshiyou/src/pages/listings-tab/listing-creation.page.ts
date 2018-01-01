import {Platform, NavParams, NavController, AlertController} from "ionic-angular";
import {OnInit, Component, ViewChild} from "@angular/core";
import {uuid} from "../../util/uuid";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {GeoPoint} from "../../loopbacksdk/models/BaseModels";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {boundaryList} from "./boundaries";
import {AuthService} from "../../services/auth.service";
import { ChangeDetectorRef } from '@angular/core';
import {MapService} from "../../services/map.service";
import {FlagService} from "../../services/flag.service";
import {NgForm} from "@angular/forms";
declare let google:any;

const DEFAULT_LAT:number = 37.41666;
const DEFAULT_LNG:number = -122.09106;

const cityToHsyGroupEnum = {
  'Mountain View': 'SouthBayWest',
  'Sunnyvale': 'SouthBayWest',
  'Palo Alto': 'SouthBayWest',
  'East Palo Alto': 'SouthBayWest',
  'Stanford': 'SouthBayWest',
  'Menlo Park': 'SouthBayWest',
  'Cupertino': 'SouthBayWest',
  'Los Gatos': 'SouthBayWest',
  'Los Altos': 'SouthBayWest',
  'Los Altos Hills': 'SouthBayWest',
  'Milpitas': 'SouthBayEast',
  'San Jose': 'SouthBayEast',
  'Saratoga': 'SouthBayEast',
  'Santa Clara': 'SouthBayEast',
};

const hsyGroupEnumToName = {
    SanFrancisco: "三番",
    SouthBayWest: "南湾西",
    SouthBayEast: "南湾东",
    EastBay: "东湾",
    MidPeninsula:'中半岛',
    None: "暂未覆盖"
}; // TODO(zzn): merge with bot code

const countyToHsyGroupEnum = {
  'San Francisco County': 'SanFrancisco',
  'San Mateo County': 'MidPeninsula',
  'Alameda County': 'EastBay',
};

const getHsyGroupEnumFromLocality = function(city, county) {
  let ret = (county == 'Santa Clara County' ?
      cityToHsyGroupEnum[city] : countyToHsyGroupEnum[county]);
  let retFixed = (typeof ret === 'undefined') ? 'None' : ret;
  return retFixed;
};


/**
 * A page contains a map view and a list showing the listings.
 */
@Component({
  selector: 'creation-page',
  templateUrl: 'listing-creation.page.html',
})
export class CreationPage implements OnInit {
  //noinspection JSUnusedLocalSymbols, JSMismatchedCollectionQueryUpdate
  // TODO(xinbenlv) uncomment this

  listingTypeEnums:string[] = ['NeedRoommate'/*招租*/, 'NeedRoom'/*求租*/];
  listing:HsyListing;

  public hsyGroupEnumOptions = [
    'SanFrancisco',
    'MidPeninsula',
    'SouthBayWest',
    'SouthBayEast',
    'EastBay',
    'ShortTerm',
    'Seattle',
    'TestGroup',
  ];
  public hsyGroupEnumOptionsMap =
      {
        'SanFrancisco': '三番',
        'MidPeninsula': '中半岛',
        'SouthBayWest': '南湾西',
        'SouthBayEast': '南湾东',
        'EastBay': '东湾',
        'ShortTerm': '短租',
        'Seattle': '西雅图',
        'TestGroup': '测试',
      };

  public amenityOptions = [
      '洗衣机', '停车位', '可养宠物'
  ];
  public localityText:string;
  private map:any; /*google.maps.Map*/
  private marker:any; /*google.maps.Marker*/
  private inTestGroup:boolean;
  @ViewChild('hsyListingForm') public hsyListingForm: NgForm;
  //noinspection JSMismatchedCollectionQueryUpdate used in HTML
  dirty:{[field:string]: boolean} = {};
  constructor(private platform:Platform, private params:NavParams,
              private nav:NavController,
              private alertCtrl:AlertController,
              private authService:AuthService,
              private mapService:MapService,
              private flagService:FlagService,
              private api:HsyListingApi,
              private ref:ChangeDetectorRef) {
    if (params.data.listing) {
      this.listing = params.data.listing;
    } else {
      this.listing = <HsyListing>{};
      this.listing.uid = uuid();
    }
    if (!this.listing.location) {
      let loc:GeoPoint = {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG
      };
      this.listing.location = loc;
    }
    if (!this.listing.amenityArray) {
      this.listing.amenityArray = [];
    }
    if (!this.listing.imageIds) this.listing.imageIds = [];
  }

  ngOnInit():any {

    this.marker = new google.maps.Marker(/*<google.maps.MarkerOptions>*/{
      position: new google.maps.LatLng(this.listing.location.lat, this.listing.location.lng),
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    google.maps.event.addListener(this.marker, 'dragend', async () => {
      let location:GeoPoint = {
        lat:  this.marker.getPosition().lat(),
        lng: this.marker.getPosition().lng()
      };
      this.listing.location = location;
      let locality = await this.mapService.getLocality(new google.maps.LatLng(
          this.listing.location.lat, this.listing.location.lng));
      let hsyGroupEnum = getHsyGroupEnumFromLocality(locality.city, locality.county)
      this.localityText = `${locality.city}, ${locality.zip} (${hsyGroupEnumToName[hsyGroupEnum]})`;
      this.listing.hsyGroupEnum = hsyGroupEnum;
      this.ref.detectChanges();
    });

  }

  private markAllControlsAsDirty() {
    Object.keys(this.hsyListingForm.controls).filter(k => {
      this.hsyListingForm.controls[k].markAsDirty();
    });
  }
  async save() {
    this.markAllControlsAsDirty();
    if (this.validate()) {
      this.listing.lastUpdated = new Date();
      this.listing.latestUpdatedOrBump = this.listing.lastUpdated;
      if (!this.listing.ownerId) {
        let local = window.localStorage;
        let meId = local['user_id']; // TODO(xinbenlv): use UserService
        this.listing.ownerId = meId;
      }
      if (this.inTestGroup) {
        this.listing.hsyGroupEnum = 'TestGroup';
      }
      await this.api.upsert<HsyListing>(this.listing).toPromise();
      await this.nav.pop();
    } else {
      this.dirty['title'] = true;
      this.dirty['content'] = true;
      this.dirty['listingTypeEnum'] = true;
    }
  }

  validate():boolean {
    return (this.listing.title && this.listing.content && (this.listing.listingTypeEnum!=null));
  }

  updateImageIds(imageIds:string[]) {
    this.listing.imageIds = imageIds;
  }

  async deleteListing(){
    let prompt = this.alertCtrl.create({
      title: '确认删除?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            this.nav.pop(); // alert
          }
        },
        {
          text: '删除',
          handler: () => {
            this.api.deleteById(this.listing.uid).take(1).toPromise().then(()=>{
              this.nav.pop().then(()=>{
                this.nav.pop();
              }); // alert
            });
          }
        }
      ]
    });
    await prompt.present();
  }

  public isDebug():boolean {
    return this.flagService.getFlag('debug');
  }

  private toggleAmenity(amenity:string):void {
    let array:string[] = this.listing.amenityArray;
    if (array.indexOf(amenity) >= 0) {
      this.listing.amenityArray = this.listing.amenityArray.filter(a => a != amenity);
    } else {
      this.listing.amenityArray.push(amenity);
    }
  }
}
