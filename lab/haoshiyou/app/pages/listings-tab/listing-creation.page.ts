import {Page, Platform, NavParams, NavController} from "ionic-angular";
import {OnInit} from "@angular/core";
import {EnumMsgPipe} from "../../pipes/enum-msg.pipe";
import {ListingType, Listing} from "../../models/listing";
import {uuid} from "../../util/uuid";
import {IListingService} from "../../services/listings/listing.service";
import {CityNZipPipe} from "../../pipes/city-n-zip.pipe";
import {MapService, ILocality} from "../../services/map.service";

const DEFAULT_CENTER = new google.maps.LatLng(37.41666, -122.09106);

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/listings-tab/listing-creation.page.html',
  pipes: [EnumMsgPipe, CityNZipPipe],
})
export class CreationPage implements OnInit {
  private typeOptions:ListingType[] = ListingType.values();
  private map:google.maps.Map;
  private marker:google.maps.Marker;
  private listing:Listing;
  private localityText:string;

  constructor(private platform:Platform, private params:NavParams,
              private listingService:IListingService,
              private nav:NavController,
              private mapService:MapService) {
    if (params.data.listing) {
      this.listing = params.data.listing;
    } else {
      this.listing = new Listing();
      this.listing.id = uuid();
      this.listing.lat = DEFAULT_CENTER.lat();
      this.listing.lng = DEFAULT_CENTER.lng();
    }


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
            this.localityText = locality.city + "," + locality.zip;
          });
    });

  }

  private save() {
    this.listingService.createListing(this.listing).then(()=> {
      // succeed.
      this.nav.pop();
    });
  }
}
