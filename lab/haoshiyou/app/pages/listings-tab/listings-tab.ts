import {Page, Platform, NavController} from "ionic-angular";
import {ListingService, MockListingService} from "../../listing.service";
import {Listing} from "../../listing";
import {OnInit, OnDestroy, provide} from "angular2/core";
import {CreationPage} from "./creation.page.ts";
import {ListingItem} from "./listing-item";
import {ListingDetailPage} from "./listing-detail";

/**
 *  Google Maps API
 */
declare let google:any;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/listings-tab/listings-tab.html',
  providers: [provide(ListingService, {useClass: MockListingService})],
  directives: [ListingItem]
})
export class ListingsTabPage implements OnInit, OnDestroy {
  ngOnDestroy():any {
    for(let marker of this.markers) {
        marker.setMap(null);
    }
  }
  private map:any; // Actually google.maps.Map;
  private markers:any[]; // Actually google.maps.Marker[];
  private listings:Listing[];

  constructor(private platform:Platform,
              private listingService:ListingService,
              private nav:NavController) {

  }

  ngOnInit() {
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

    let initListings:Promise<any> = this.listingService.getListings(
        /* TODO(zzn): currently get all, need to narrow down. */)
        .then((listings) => {
          this.listings = listings;
        });
    Promise.all([initMap, initListings]).then(() => {
      this.markers = []; // TODO(zzn): shall we reset all markers?
      for (let listing of this.listings) {
        let marker = new google.maps.Marker({
          position: {lat: listing.lat, lng: listing.lng},
          animation: google.maps.Animation.DROP,
          map: this.map
        });
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

  gotoDetail(listing: Listing) {
    this.nav.push(ListingDetailPage, {listing: listing});
  }
}
