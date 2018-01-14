import {Component, OnChanges, Input, SimpleChange, OnInit, Output, EventEmitter} from "@angular/core";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {ListingDetailPage} from "./listing-detail.page";
import {NavController} from "ionic-angular";
import {GeoPoint} from "../../loopbacksdk/models/BaseModels";

declare let google, document;
declare let ga:any;


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
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to search within the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = '在地图区域内搜索';
  controlUI.appendChild(controlText);

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
  private center = { lat: 37.6042379, lng: -122.1755228};
  private markers = [];
  @Output()
  onBoundaryFilter = new EventEmitter<any>();
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
    this.nav.push(ListingDetailPage, {listing: listing});
  }

  public render() {
    if (!document.getElementById('map_view_canvas')) {
      this.map = null;
      return;
    } // do nothing
    this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
      zoom: this.zoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map.setCenter(new google.maps.LatLng(this.center.lat, this.center.lng));

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var searchInMapButtonDiv = document.createElement('div');
    var centerControl = new SearchButtonInMap(searchInMapButtonDiv, this.map, this.onBoundaryFilter);

    searchInMapButtonDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInMapButtonDiv);
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      google.maps.event.trigger(this.map, 'resize');
      this.mapDirty = true;
    });
    for (let marker of this.markers) {
      marker.setMap(this.map);
    }
  }

  public addListings(newListings:HsyListing[]) {
    let listingsHasLocation = newListings.filter((l) => l.location);
    listingsHasLocation.map((listing:HsyListing) => {
        let marker = new google.maps.Marker({
          position: new google.maps.LatLng(listing.location.lat, listing.location.lng),
          icon: `data:image/svg+xml,
<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38">
    <path fill="#FFFFFF" stroke="#ccc" stroke-width=".5"
          d="M34.305 16.234c0 8.83-15.148 19.158-15.148 19.158S3.507 25.065 3.507 16.1c0-8.505 6.894-14.304 15.4-14.304 8.504 0 15.398 5.933 15.398 14.438z"/>
    <text transform="translate(19 18.5)" 
          fill="#000" 
          style="font-family: Arial, sans-serif;
          text-align:center;"
          font-size="10" text-anchor="middle">${listing.price ? listing.price : '待议'}
    </text>
</svg>`,
          map: this.map
        });
        marker.addListener('click', () => {
          this.gotoListingDetail(listing);
        });
        this.markers.push(marker);
    });
  }

  public clearMarkers() {
    this.markers.forEach(l => l.setMap(null));
    this.markers = [];
  }

}
