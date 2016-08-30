import {Page, Platform, NavController, Alert} from "ionic-angular";
import {IListingService} from "../../services/listings/listing.service.ts";
import {Listing} from "../../models/listing";
import {OnInit, OnDestroy, Inject} from "@angular/core";
import {CreationPage} from "./listing-creation.page.ts";
import {ListingItem} from "./listing-item.comp";
import {ListingDetailPage} from "./listing-detail.page";
import {Observable} from "rxjs/Observable";
import {loggerToken} from "../../services/log.service";
import {Logger} from "log4javascript/log4javascript";
import {AuthService} from "../../services/auth.service";

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
  private listingObservable: Observable<Listing[]>;
  private mapReady:boolean = false;
  constructor(private platform:Platform,
              private listingService:IListingService,
              private nav:NavController,
              private auth:AuthService,
              @Inject(loggerToken) private logger:Logger) {

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
    }).then(()=>{
      this.mapReady = true;
      this.updateMarkers();
    });


    this.listingObservable = this.listingService.observableListings();
    this.listingObservable.subscribe((listings:Listing[]) => {
      /* TODO(xinbenlv): currently get all, need to narrow down. */
      this.listings = listings.reverse();
      this.updateMarkers();
    });
  }

  private updateMarkers() {
    if(this.mapReady && this.listings) {
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
    }
  }

  gotoCreationPage() {
    if (this.auth.authenticated()) {
      //push another page onto the history stack
      //causing the nav controller to animate the new page in
      this.nav.push(CreationPage);
    } else {
      let alert = Alert.create({
        title: '请登录后发帖',
        buttons: ['好的']
      });
      this.nav.present(alert);
    }
  }

  gotoDetail(listing:Listing) {
    this.nav.push(ListingDetailPage, {listing: listing});
  }
}
