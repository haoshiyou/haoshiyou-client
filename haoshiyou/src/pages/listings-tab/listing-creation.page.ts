import {Platform, NavParams, NavController, AlertController} from "ionic-angular";
import {OnInit, Component} from "@angular/core";
import {uuid} from "../../util/uuid";
import {IUserService} from "../../services/chats/user.service";
import {User} from "../../models/models";
import {NotificationService} from "../../services/notfication.service";
import {ILocality, MapService} from "../../services/map.service";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {GeoPoint} from "../../../.tmp/loopbacksdk/models/BaseModels";
import {HsyListingApi} from "../../loopbacksdk/services/custom/HsyListing";

declare let google:any;

const DEFAULT_LAT:number = 37.41666;
const DEFAULT_LNG:number = -122.09106;
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
  // typeOptions:ListingType[] = [ListingType.ROOMMATE_WANTED, ListingType.ROOM_WANTED];
  listing:HsyListing;
  localityText:string;
  private map:any; /*google.maps.Map*/
  private marker:any; /*google.maps.Marker*/
  //noinspection JSMismatchedCollectionQueryUpdate used in HTML
  dirty:{[field:string]: boolean} = {};
  constructor(private platform:Platform, private params:NavParams,
              private nav:NavController,
              private alertCtrl:AlertController,
              private userService:IUserService,
              private notificationService:NotificationService,
              private mapService:MapService,
              private api:HsyListingApi) {
    if (params.data.listing) {
      this.listing = params.data.listing;
    } else {
      this.listing = <HsyListing>{};
      this.listing.uid = uuid();
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
      var minZoomLevel = 9;

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
    });

    this.marker = new google.maps.Marker(/*<google.maps.MarkerOptions>*/{
      position: new google.maps.LatLng(this.listing.location.lat, this.listing.location.lng),
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    google.maps.event.addListener(this.marker, 'dragend', () => {
      let loc:GeoPoint = {
        lat:  this.marker.getPosition().lat(),
        lng: this.marker.getPosition().lng()
      };
      this.listing.location = loc;
      this.mapService.getLocality(new google.maps.LatLng(
          this.listing.location.lat, this.listing.location.lng))
          .then((locality:ILocality)=> {
            this.localityText = locality.city + ", " + locality.zip;
          });
    });
  }

  save() {
    if (this.validate()) {
      this.listing.lastUpdated = new Date();
      this.userService.promiseMe().then((me:User)=> {
        this.listing.ownerId = me.id;
      }).then(()=> {
        return this.api.create<HsyListing>(this.listing);
      }).then(()=> {
        // succeed.
        return this.notificationService.sendTopicMessage(NotificationService.TOPIC_LISTING, this.listing.title);
      }).then(()=> {
        return this.nav.pop();
      });
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

  deleteListing(): void {
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
    prompt.present();
  }
}
