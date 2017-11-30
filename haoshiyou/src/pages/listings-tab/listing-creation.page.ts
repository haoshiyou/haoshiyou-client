import {Platform, NavParams, NavController, AlertController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {uuid} from "../../util/uuid";
import {NotificationService} from "../../services/notfication.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {GeoPoint} from "../../loopbacksdk/models/BaseModels";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";
import {boundaryList} from "./boundaries";
import {AuthService} from "../../services/auth.service";
import { ChangeDetectorRef } from '@angular/core';
import {MapService} from "../../services/map.service";
import {FlagService} from "../../services/flag.service";
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

  typeOptions:number[] = [0/*招租*/, 1/*求租*/];
  listing:HsyListing;
  public localityText:string;
  private map:any; /*google.maps.Map*/
  private marker:any; /*google.maps.Marker*/
  private inTestGroup:boolean;
  //noinspection JSMismatchedCollectionQueryUpdate used in HTML
  dirty:{[field:string]: boolean} = {};
  constructor(private platform:Platform, private params:NavParams,
              private nav:NavController,
              private alertCtrl:AlertController,
              private authService:AuthService,
              private notificationService:NotificationService,
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
    if (!this.listing.imageIds) this.listing.imageIds = [];
  }

  ngOnInit():any {
    this.platform.ready().then(() => {
      let minZoomLevel = 9;

      // Load Google Maps
      /* TODO(xinbenlv): follow example here
       * https://codingwithspike.wordpress.com/2014/08/13/loading-google-maps-in-cordova-the-right-way/
       * To load the Google Maps JS API based on device connection.
       *
       * Or use Google Maps TS Definition Files.
       */
      this.map = new google.maps.Map(document.getElementById('map_drag_canvas'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(this.listing.location.lat, this.listing.location.lng), // Google
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.marker.setMap(this.map);
      this.renderBoundary();
    });

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
  renderBoundary() {
    let hsyGroupEnumList = {
      'SanFrancisco': '#CD5C5C',
      'SouthBayWest': '#86FF33',
      'SouthBayEast': '#FF5733',
      'EastBay': '#A6B1F7',
      'MidPeninsula': '#FFC300',
    };
    for (let hsyGroupEnum in hsyGroupEnumList) {
      let color = hsyGroupEnumList[hsyGroupEnum];
      for (let city of boundaryList[hsyGroupEnum]) {

        let triangleCoords = [];
        for (let pair of city) {
          triangleCoords.push({lng: pair[0], lat: pair[1]});
        }
        // Construct the polygon.
        let triangle = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35
        });
        triangle.setMap(this.map);
      }
    }
  };

  async save() {
    if (this.validate()) {
      this.listing.lastUpdated = new Date();
      if (!this.listing.ownerId) {
        let local = window.localStorage;
        let meId = local['user_id']; // TODO(xinbenlv): use UserService
        this.listing.ownerId = meId;
      }
      if (this.inTestGroup) {
        this.listing.hsyGroupEnum = 'TestGroup';
      }
      await this.api.upsert<HsyListing>(this.listing).toPromise();
      await this.notificationService.sendTopicMessage(NotificationService.TOPIC_LISTING, this.listing.title);
      await this.nav.pop();
    } else {
      this.dirty['title'] = true;
      this.dirty['content'] = true;
      this.dirty['type'] = true;
    }
  }

  validate():boolean {
    return (this.listing.title && this.listing.content && (this.listing.type!=null));
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
}
