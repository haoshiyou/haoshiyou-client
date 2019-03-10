import {
  Component, OnChanges, Input, SimpleChange, OnInit, Output, EventEmitter, ElementRef,
  ViewChild
} from "@angular/core";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {NavController} from "ionic-angular";
import {ListingUxDetailPage} from "./listing-ux-detail.page";

declare let google, document;
declare let ga:any;
const DEFAULT_CENTER = { lat: 37.6042379, lng: -122.1755228};

/**
 * The addSearchButtonInMap adds a button to the map that allows
 * seach in the map.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function SearchButtonInMap(controlDiv, map, eventEmitter) {

  // Set CSS for the control border.
  // TODO(xinbenlv): from Google Map developer example, to be updated.
  var controlUI = document.createElement('div');
  controlUI.classList = ['search-in-map-btn'];
  controlUI.innerHTML = '在地图区域内搜索';
  controlDiv.appendChild(controlUI);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    eventEmitter.emit(map.getBounds());
  });

}

@Component({
  selector: 'map-view',
  templateUrl: 'map-view.comp.html',
})
export class MapViewComponent implements OnChanges {
  private zoomLevel = 10; // default
  private markers = [];
  private listingsForMarkers = [];
  @ViewChild('mapCanvas') mapCanvas:ElementRef;

  @Output()
  onBoundaryFilter = new EventEmitter<any>();
  @Input() showSearchButton:boolean = true;
  private map = google.maps.Maps;
  private mapDirty = false;
  constructor(private nav:NavController,) {
  }
  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['listings']) {
      this.render();
    }
  }
  private gotoListingDetail(listing:HsyListing) {
    ga('send', 'event', {
      eventCategory: 'go-to',
      eventAction: 'listing-detail',
      eventLabel: 'from-map-view'
    });
    this.nav.push('ListingUxDetailPage', {listing: listing});

  }

  public render() {
    if (!this.mapCanvas || !this.mapCanvas.nativeElement) {
      this.map = null;
      return;
    } // do nothing

    this.map = new google.maps.Map(this.mapCanvas.nativeElement, {
      zoom: this.zoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.setCenter(DEFAULT_CENTER);
    console.log(' --- get geolocation and set center --- ');

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var searchInMapButtonDiv = document.createElement('div');
    if (this.showSearchButton) var centerControl = new SearchButtonInMap(searchInMapButtonDiv, this.map, this.onBoundaryFilter);

    searchInMapButtonDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInMapButtonDiv);
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      google.maps.event.trigger(this.map, 'resize');
      this.mapDirty = true;
    });
    this.renderMarkers();
  }

  public addListings(newListings:HsyListing[]) {
    console.log(' --- addListings --- ');
    let listingsHasLocation = newListings.filter((l) => l.location);
    listingsHasLocation.map((listing:HsyListing) => {
        this.listingsForMarkers.push(listing);
    });
  }

  /*
   * Two reasons caused marker not rendered in Chrome/Firefox:
   * 1. google maps rendering sequence https://stackoverflow.com/questions/36911245/ionic-2-map-markers-not-appearing
   * 2. customized icon in marker
   */
  private renderMarkers() {
    console.log(' --- renderMarkers --- ');
    for (let listing of this.listingsForMarkers) {
      console.log(' --- in listing: ' + listing);
      let price  = listing.price ? "$" + listing.price : "待议";
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(listing.location.lat, listing.location.lng),
        icon: { url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38"><path fill="#21b3fe" stroke="#ccc" stroke-width=".5" d="M34.305 16.234c0 8.83-15.148 19.158-15.148 19.158S3.507 25.065 3.507 16.1c0-8.505 6.894-14.304 15.4-14.304 8.504 0 15.398 5.933 15.398 14.438z"/><text transform="translate(19 18.5)" fill="#fff" style="font-family: Arial, sans-serif; text-align:center;" font-size="10" text-anchor="middle">' + price + '</text></svg>') },
        map: this.map,
      });
      marker.addListener('click', () => {
        this.gotoListingDetail(listing);
        });
    }
  }

  public clearMarkers() {
    this.markers.forEach(l => l.setMap(null));
    this.markers = [];
  }

  public setCenter(center) {
    if (this.map) this.map.setCenter(new google.maps.LatLng(center.lat, center.lng));
  }
}
