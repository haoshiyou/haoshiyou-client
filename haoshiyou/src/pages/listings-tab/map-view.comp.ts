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
  @Input() listings:HsyListing[];
  listingsHasLocation:HsyListing[] = null;
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

  public resize() {
    console.log(`XXX mapview Triggered resize!`);
    google.maps.event.trigger(this.map, 'resize');
  }
  public render() {
    this.mapDirty = false;
    console.log(`XXX Render!`);
    let minZoomLevel = 10;
    let latAve:number = 0, lngAve:number = 0;
    if (document.getElementById('map_view_canvas')) {
      this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
        zoom: minZoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      if (this.listings) {
        this.listingsHasLocation = this.listings.filter(l => l.location);
        let n = this.listingsHasLocation.length;

        this.listingsHasLocation.map((listing:HsyListing) => {
            latAve += listing.location.lat/n;
            lngAve += listing.location.lng/n;
            let marker = new google.maps.Marker({
              position: new google.maps.LatLng(listing.location.lat, listing.location.lng),
            });
            marker.addListener('click', () => {
              this.gotoListingDetail(listing);
            });
            marker.setMap(this.map);
        });
        console.log(`XXX averaging locations to get lat = ${latAve}, lng = ${lngAve}, n = ${n}`);

      }
    }
    if (latAve == 0 || lngAve == 0) {
      latAve = 	37.386051;
      lngAve = -122.083855;
      console.log(`XXX empty locations, set lat = ${latAve}, lng = ${lngAve}`);
    }

    latAve = 	37.6042379;
    lngAve = -122.1755228;
    this.map.setCenter(new google.maps.LatLng(latAve, lngAve));
    google.maps.event.addListener(this.map, 'bounds_changed', () => {
      if (!this.mapDirty) console.log(`XXX New Bounds: ${this.map.getBounds()}`);
      this.mapDirty = true;
    });
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var searchInMapButtonDiv = document.createElement('div');
    var centerControl = new SearchButtonInMap(searchInMapButtonDiv, this.map, this.onBoundaryFilter);

    searchInMapButtonDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchInMapButtonDiv);
    this.resize();
  }


}
