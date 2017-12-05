import {Component, OnChanges, Input, SimpleChange, OnInit} from "@angular/core";
import {HsyListing} from "../../loopbacksdk/models/HsyListing";

declare let google, document;

@Component({
  selector: 'map-view',
  templateUrl: 'map-view.comp.html'
})
export class MapViewComponent implements OnChanges {
  @Input() listings:HsyListing[];
  private map = google.maps.Maps;
  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['listings']) {
      this.render();
    }
  }

  private render() {
    let minZoomLevel = 11;
    let latAve:number = 	37.386051, lngAve:number = -122.083855;
    this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
      zoom: minZoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    if (this.listings) {

      let listingsHasLocation = this.listings.filter(l => l.location);
      let n = listingsHasLocation.length;
      listingsHasLocation.map((listing:HsyListing) => {
        if (listing.location) {
          latAve += listing.location.lat/n;
          lngAve += listing.location.lng/n;
          let marker = new google.maps.Marker({
            position: new google.maps.LatLng(listing.location.lat, listing.location.lng),
          });
          marker.setMap(this.map);
        }

      });
      this.map.setCenter(new google.maps.LatLng(latAve, lngAve));
    }

  }
}
