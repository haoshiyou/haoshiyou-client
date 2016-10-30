import {Component, OnChanges, Input, SimpleChange} from "@angular/core";
import {Listing} from "../../models/listing";

declare let google:any;

@Component({
  selector: 'map-view',
  templateUrl: 'map-view.comp.html'
})
export class MapViewComponent implements OnChanges {
  @Input() listings:Listing[];
  private map = google.maps.Maps;
  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['listings']) {
      this.render();
    }
  }

  private render() {
    let minZoomLevel = 9;
    this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
      zoom: minZoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    let latAve:number = 0, lngAve:number = 0, n = this.listings.length;
    this.listings.map((listing:Listing) => {
      latAve += listing.lat/n;
      lngAve += listing.lng/n;
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(listing.lat, listing.lng),
      });
      marker.setMap(this.map);
    });
    this.map.setCenter(new google.maps.LatLng(latAve, lngAve));
  }
}
