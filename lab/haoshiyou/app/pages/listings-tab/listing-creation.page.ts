import {Page, Platform, NavParams, NavController, Modal, Alert} from "ionic-angular";
import {OnInit, Inject} from "@angular/core";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe";
import {ListingType, Listing} from "../../models/listing";
import {uuid} from "../../util/uuid";
import {IListingService} from "../../services/listings/listing.service";
import {CityNZipPipe} from "../../pipes/city-n-zip.pipe";
import {MapService, ILocality} from "../../services/map.service";
import {ImagePicker} from "ionic-native";
import {Logger} from "log4javascript";
import {loggerToken} from "../../services/log.service";
import {IImageService} from "../../services/image.service";
import {ImageGridComponent} from "./image-grid.comp";
import {ImageIdsToUrlPipe} from "../../pipes/image-id-to-url.pipe.ts";
import {IUserService} from "../../services/chats/user.service";
import {User} from "../../models/models";
import {RemoveModal} from "./remove.modal";

// TODO(xinbenlv):
const DEFAULT_CENTER = new google.maps.LatLng(37.41666, -122.09106);

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/listings-tab/listing-creation.page.html',
  pipes: [EnumMsgPipe, CityNZipPipe, ImageIdsToUrlPipe],
  directives: [ImageGridComponent]
})
export class CreationPage implements OnInit {
  //noinspection JSUnusedLocalSymbols
  private typeOptions:ListingType[] = ListingType.values();
  private map:google.maps.Map;
  private marker:google.maps.Marker;
  private listing:Listing;
  private localityText:string;
  private dirty:{[field:string]: boolean} = {};
  private removeModal:Modal;
  constructor(private platform:Platform, private params:NavParams,
              private listingService:IListingService,
              private nav:NavController,
              private mapService:MapService,
              private imageService:IImageService,
              @Inject(loggerToken) private logger:Logger,
              private userService:IUserService) {
    if (params.data.listing) {
      this.listing = params.data.listing;
      this.logger.debug(`Edit listing ${JSON.stringify(this.listing)}`);
    } else {
      this.logger.debug(`Create a listing`);
      this.listing = <Listing>{};
      this.listing.id = uuid();
      this.listing.lat = DEFAULT_CENTER.lat();
      this.listing.lng = DEFAULT_CENTER.lng();
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
    google.maps.event.addListener(this.marker, 'dragend', (event) => {
      this.listing.lat = this.marker.getPosition().lat();
      this.listing.lng = this.marker.getPosition().lng();
      this.mapService.getLocality(new google.maps.LatLng(this.listing.lat, this.listing.lng))
          .then((locality:ILocality)=> {
            this.localityText = locality.city + ", " + locality.zip;
          });
    });

  }

  private save() {
    if (this.validate()) {
      this.listing.lastUpdated = Date.now();
      this.logger.debug(`Creating listing on ${this.listing.lastUpdated}`);
      this.userService.promiseMe().then((me:User)=> {
        this.listing.ownerId = me.id;
      }).then(()=> {
        this.listingService.createListing(this.listing);
      }).then(()=> {
        // succeed.
        this.logger.debug(`Saved listing: ${JSON.stringify(this.listing)}`);
        this.nav.pop();
      });
    } else {
      this.dirty['title'] = true;
      this.dirty['content'] = true;
      this.dirty['type'] = true;
    }
  }

  private pickPictures() {
    ImagePicker.getPictures({})
        .then((urls:string[]) => {
          return this.imageService.uploadImagesAndGetIds(urls)
        })
        .then((storedImageIds:string[]) => {
          if (!this.listing.imageIds) this.listing.imageIds = [];
          this.listing.imageIds = this.listing.imageIds.concat(storedImageIds);
          this.logger.info(`Listing added imageIds: ${JSON.stringify(storedImageIds)}`);
          this.logger.debug(`Listing result imageIds: ${JSON.stringify(this.listing.imageIds)}`);
        })
        .catch((err) => {
          this.logger.error(`Creation page attempt to add images result in error! ${JSON.stringify(err)}`);
          // TODO(xinbenlv, #error-handling): handle error, using.
          alert("Failed to upload images!");
        });
  }

  private deletePictures() {
    this.removeModal = Modal.create(RemoveModal, {listing: this.listing});
    this.nav.present(this.removeModal, {animate: true});
  }

  private deleteListing() {

    let prompt = Alert.create({
      title: '确认删除?',
      buttons: [
        {
          text: '取消',
          handler: data => {
            // Do nothing
            console.log(data); //XXX
            this.nav.pop(); // alert
          }
        },
        {
          text: '删除',
          handler: data => {
            console.log(data); //XXX
            this.listingService.removeListing(this.listing.id).then(()=>{
              this.nav.pop().then(()=>{
                this.nav.pop();
              }); // alert
            });
          }
        }
      ]
    });

    this.nav.present(prompt);

  }

  validate():boolean {
    return (this.listing.title && this.listing.content && (this.listing.type!=null));
  }
}
