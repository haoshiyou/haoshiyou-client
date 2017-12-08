import {Component, OnChanges, Input, SimpleChange, OnInit} from "@angular/core";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";
import {ListingDetailPage} from "./listing-detail.page";
import {NavController} from "ionic-angular";

declare let google, document;
declare let ga:any;
@Component({
  selector: 'map-view',
  templateUrl: 'map-view.comp.html',
})
export class MapViewComponent implements OnChanges {
  @Input() listings:HsyListing[];
  listingsHasLocation:HsyListing[] = null;
  private map = google.maps.Maps;

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
    console.log(`XXX Render!`);
    let minZoomLevel = 11;
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
    this.map.setCenter(new google.maps.LatLng(latAve, lngAve));
    this.resize();
  }

}
