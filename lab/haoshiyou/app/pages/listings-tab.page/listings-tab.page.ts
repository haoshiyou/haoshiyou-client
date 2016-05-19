import {Page, Platform} from 'ionic-angular';
import { ListingService } from '../../listing.service';
import { Listing } from '../../listing';
import { OnInit } from 'angular2/core';

/**
 *  Google Maps API
 */
declare let google: any;

/**
 * A page contains a map view and a list showing the listings.
 */
@Page({
  templateUrl: 'build/pages/page2/listings-tab.page.html',
  providers: [ListingService]
})
export class ListingsTabPage implements OnInit {
  private map: any; // actually google.maps.Map;
  private markers: any[] = []; // atually google.maps.Marker[];
  private listings: Listing[];
  constructor(private platform: Platform,
    private listingService: ListingService
  ) {

  }

  ngOnInit() {
    let initMap: Promise<any> = this.platform.ready().then(() => {
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

    let initListings: Promise<any> = this.listingService.getListings(
        /* TODO(zzn): currently get all, need to narrow down. */)
        .then((listings) => {this.listings = listings;});
    Promise.all([initMap, initListings]).then(() => {
      this.markers = []; // TODO(zzn): shall we reset all markers?
      for (let listing of this.listings) {
        let marker = new google.maps.Marker({
          position: {lat: listing.lat, lng: listing.lng},
          map: this.map
        });
        this.markers.push(marker);
      }
    });
  }
}
