import {Component, OnChanges, Input, SimpleChange} from "@angular/core";
import {Listing} from "../../models/listing";
declare let MarkerWithLabel:any;
@Component({
  selector: 'map-view',
  templateUrl: 'build/pages/listings-tab/map-view.comp.html'
})
export class MapViewComponent implements OnChanges {
  private map:google.maps.Map;
  @Input() listings:Listing[];

  ngOnChanges(changes:{[propertyName:string]:SimpleChange}) {
    if (changes['listings']) {
      this.render();
    }
  }

  private render() {
    var minZoomLevel = 9;
    this.map = new google.maps.Map(document.getElementById('map_view_canvas'), {
      zoom: minZoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    let latAve:number = 0, lngAve:number = 0, n = this.listings.length;
    /////////
    this.listings.map((listing:Listing) => {
      latAve += listing.lat/n;
      lngAve += listing.lng/n;
      // let marker = new google.maps.Marker(<google.maps.MarkerOptions>{
      //   position: new google.maps.LatLng(listing.lat, listing.lng),
      // });
      ////
      var marker = new MarkerWithLabel({
        position: new google.maps.LatLng(listing.lat, listing.lng),
        map: this.map,
        draggable: true,
        raiseOnDrag: true,
        labelContent: listing.price,
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "labels", // the CSS class for the label 
        labelStyle: {opacity: 0.75}
      });
      ///
      //marker.setMap(this.map);
    });
    this.map.setCenter(new google.maps.LatLng(latAve, lngAve));

  }
}