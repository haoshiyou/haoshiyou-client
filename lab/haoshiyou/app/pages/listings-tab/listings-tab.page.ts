import {Page, Platform, NavController} from "ionic-angular";
import {IListingService} from "../../services/listings/listing.service.ts";
import {Listing} from "../../models/listing";
import {OnInit, OnDestroy} from "@angular/core";
import {CreationPage} from "./listing-creation.page.ts";
import {ListingItem} from "./listing-item.comp";
import {ListingDetailPage} from "./listing-detail.page";
import LatLng = google.maps.LatLng;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/listings-tab/listings-tab.page.html',
  directives: [ListingItem]
})
export class ListingsTabPage implements OnInit, OnDestroy {
  ngOnDestroy():any {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
  }

  private map:any; // Actually google.maps.Map;
  private markers:any[]; // Actually google.maps.Marker[];
  private listings:Listing[];

  constructor(private platform:Platform,
              private listingService:IListingService,
              private nav:NavController) {

  }

  ngOnInit() {
    // ChatFakeDataLoader.init(this.messagesService, this.threadsService, this.userService);
    let initMap:Promise<any> = this.platform.ready().then(() => {
      var minZoomLevel = 9;

      // Load Google Maps
      /* TODO(xinbenlv): follow example here
       * https://codingwithspike.wordpress.com/2014/08/13/loading-google-maps-in-cordova-the-right-way/
       * To load the Google Maps JS API based on device connection.
       *
       * Or use Google Maps TS Definition Files.
       */
      this.map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: minZoomLevel,
        center: new google.maps.LatLng(37.41666, -122.09106), // Google
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
    });

    let initListings:Promise<void> = this.listingService.getListings(
        /* TODO(xinbenlv): currently get all, need to narrow down. */)
        .then((listings) => {
          this.listings = listings;
        });
    Promise.all([initMap, initListings]).then(() => {
      this.markers = [];
      for (let listing of this.listings) {
        let opt:google.maps.MarkerOptions = <google.maps.MarkerOptions>{};
        opt.position = new google.maps.LatLng(listing.lat, listing.lng);
        opt.animation = google.maps.Animation.DROP;
        opt.map = this.map;
        let marker = new google.maps.Marker(opt);
        marker.addListener('click', () => this.gotoDetail(listing));
        this.markers.push(marker);
      }
    });
  }

  gotoCreationPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.nav.push(CreationPage);
  }

  gotoDetail(listing:Listing) {
    this.nav.push(ListingDetailPage, {listing: listing});
  }
}
