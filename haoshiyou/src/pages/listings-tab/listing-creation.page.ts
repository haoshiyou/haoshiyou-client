import {Platform, NavParams, NavController, AlertController} from "ionic-angular";
import {OnInit, Inject, Component} from "@angular/core";
import {ListingType, Listing} from "../../models/listing";
import {uuid} from "../../util/uuid";
import {IListingService} from "../../services/listings/listing.service";
import {MapService, ILocality} from "../../services/map.service";
import {Logger} from "log4javascript";
import {loggerToken} from "../../services/log.service";
import {IUserService} from "../../services/chats/user.service";
import {User} from "../../models/models";
import {NotificationService} from "../../services/notfication.service";

import {google} from "googlemaps";

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
  private typeOptions:ListingType[] = [ListingType.ROOMMATE_WANTED, ListingType.ROOM_WANTED];
  private map:google.maps.Map;
  private marker:google.maps.Marker;
  private listing:Listing;
  private localityText:string;
  //noinspection JSMismatchedCollectionQueryUpdate used in HTML
  private dirty:{[field:string]: boolean} = {};
  constructor(private platform:Platform, private params:NavParams,
              private listingService:IListingService,
              private nav:NavController,
              private alertCtrl:AlertController,
              private mapService:MapService,
              @Inject(loggerToken) private logger:Logger,
              private userService:IUserService,
              private notificationService:NotificationService) {
    if (params.data.listing) {
      this.listing = params.data.listing;
      this.logger.debug(`Edit listing ${JSON.stringify(this.listing)}`);
    } else {
      this.logger.debug(`Create a listing`);
      this.listing = <Listing>{};
      this.listing.id = uuid();
      this.listing.lat = DEFAULT_LAT;
      this.listing.lng = DEFAULT_LNG;
    }
    if (!this.listing.imageIds) this.listing.imageIds = [];
    this.logger.debug("Initialized CreationPage with listing %s", JSON.stringify(this.listing));
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
        center: new google.maps.LatLng(this.listing.lat, this.listing.lng), // Google
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      this.marker.setMap(this.map);
    });

    this.marker = new google.maps.Marker(<google.maps.MarkerOptions>{
      position: new google.maps.LatLng(this.listing.lat, this.listing.lng),
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.listing.lat = this.marker.getPosition().lat();
      this.listing.lng = this.marker.getPosition().lng();
      this.mapService.getLocality(new google.maps.LatLng(this.listing.lat, this.listing.lng))
          .then((locality:ILocality)=> {
            this.localityText = locality.city + ", " + locality.zip;
          });
    });
  }


  //noinspection JSUnusedLocalSymbols: used in HTML
  private save() {
    if (this.validate()) {
      this.listing.lastUpdated = Date.now();
      this.logger.debug(`Creating listing, timestamp=${this.listing.lastUpdated}, content=${this.listing}`);
      this.userService.promiseMe().then((me:User)=> {
        this.listing.ownerId = me.id;
      }).then(()=> {
        return this.listingService.createListing(this.listing);
      }).then(()=> {
        // succeed.
        this.logger.debug(`Saved listing: ${JSON.stringify(this.listing)}, now sending notification!`);
        return this.notificationService.sendTopicMessage(NotificationService.TOPIC_LISTING, this.listing.title);
      }).then(()=> {
        this.logger.debug(`Notification done!`);
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
  //noinspection JSUnusedLocalSymbols, used in HTML,
  private deleteListing(): void {
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
            this.listingService.removeListing(this.listing.id).then(()=>{
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
